import type { APIRoute } from 'astro';
import { turso } from '../../lib/turso';
import { resend } from '../../lib/resend';
import { createHash } from 'node:crypto';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// process.env at runtime on Vercel, import.meta.env in local dev.
function env(key: string): string | undefined {
  return process.env[key] ?? import.meta.env[key];
}

function hashIp(ip: string): string {
  return createHash('sha256')
    .update(ip + (env('IP_HASH_SALT') || 'cauce-default-salt'))
    .digest('hex')
    .substring(0, 16);
}

function sanitize(s: string, maxLen: number): string {
  return s.replace(/[\r\n\t]/g, '').substring(0, maxLen);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ ok: false, error: 'invalid_body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const email = String(body.email || '').trim().toLowerCase();
    const locale = body.locale === 'es' ? 'es' : 'en';

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      return new Response(
        JSON.stringify({ ok: false, error: 'invalid_email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ipHash = hashIp(clientAddress || 'unknown');
    const userAgent = sanitize(
      request.headers.get('user-agent') || 'unknown',
      200
    );

    // Insert with silent ON CONFLICT (do not reveal whether it already exists).
    const result = await turso.execute({
      sql: `INSERT INTO waitlist (email, locale, ip_hash, user_agent, source)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(email) DO NOTHING
            RETURNING id`,
      args: [email, locale, ipHash, userAgent, 'cauce.dev'],
    });

    const isNew = result.rows.length > 0;

    // Only send emails for genuinely new signups.
    if (isNew) {
      await sendConfirmation(email, locale);
      await sendAdminNotification(email, locale, ipHash, userAgent);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[waitlist] error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'server_error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

async function sendConfirmation(email: string, locale: 'en' | 'es') {
  const isEs = locale === 'es';

  const subject = isEs
    ? 'Te has unido a la waitlist de Cauce'
    : "You're on the Cauce waitlist";

  const html = isEs ? CONFIRMATION_HTML_ES : CONFIRMATION_HTML_EN;

  await resend.emails.send({
    from: 'Cauce <noreply@cauce.dev>',
    to: email,
    subject,
    html,
  });
}

async function sendAdminNotification(
  email: string,
  locale: string,
  ipHash: string,
  userAgent: string
) {
  const notifyTo = env('NOTIFICATION_EMAIL');
  if (!notifyTo) return;

  // Current total.
  const countResult = await turso.execute(
    'SELECT COUNT(*) as n FROM waitlist'
  );
  const total = countResult.rows[0].n;

  await resend.emails.send({
    from: 'Cauce Waitlist <noreply@cauce.dev>',
    to: notifyTo,
    subject: `New waitlist signup: ${email}`,
    text: `Nuevo registro en la waitlist de Cauce.

Email:      ${email}
Locale:     ${locale}
IP hash:    ${ipHash}
User agent: ${userAgent}
Timestamp:  ${new Date().toISOString()}

Total signups: ${total}

—
cauce.dev`,
  });
}

const CONFIRMATION_HTML_EN = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif;color:#0E0F0D;">
<div style="max-width:600px;margin:0 auto;padding:60px 40px;">
  <div style="font-size:32px;font-weight:600;margin-bottom:32px;">Cauce</div>
  <p style="font-size:18px;line-height:1.7;margin:0 0 24px;">Hi,</p>
  <p style="font-size:18px;line-height:1.7;margin:0 0 24px;">
    Thanks for joining the Cauce waitlist. You're now on the list to
    hear about our open infrastructure for AI agents — the European one,
    the honest one, the one built right.
  </p>
  <p style="font-size:18px;line-height:1.7;margin:0 0 24px;">
    We'll write again when there's something real worth showing.
  </p>
  <p style="font-size:18px;line-height:1.7;margin:0 0 40px;">— Cauce</p>
  <div style="border-top:1px solid #ECEEE8;padding-top:24px;font-size:14px;color:#8C8D82;">
    <a href="https://cauce.dev" style="color:#2DD4C0;text-decoration:none;">cauce.dev</a>
  </div>
</div>
</body></html>`;

const CONFIRMATION_HTML_ES = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#ffffff;font-family:Georgia,serif;color:#0E0F0D;">
<div style="max-width:600px;margin:0 auto;padding:60px 40px;">
  <div style="font-size:32px;font-weight:600;margin-bottom:32px;">Cauce</div>
  <p style="font-size:18px;line-height:1.7;margin:0 0 24px;">Hola,</p>
  <p style="font-size:18px;line-height:1.7;margin:0 0 24px;">
    Gracias por unirte a la waitlist de Cauce. Estás en la lista
    para recibir noticias sobre nuestra infraestructura abierta para
    agentes de IA — la europea, la honesta, la hecha bien.
  </p>
  <p style="font-size:18px;line-height:1.7;margin:0 0 24px;">
    Te escribiremos de nuevo cuando haya algo real que merezca enseñarse.
  </p>
  <p style="font-size:18px;line-height:1.7;margin:0 0 40px;">— Cauce</p>
  <div style="border-top:1px solid #ECEEE8;padding-top:24px;font-size:14px;color:#8C8D82;">
    <a href="https://cauce.dev" style="color:#2DD4C0;text-decoration:none;">cauce.dev</a>
  </div>
</div>
</body></html>`;
