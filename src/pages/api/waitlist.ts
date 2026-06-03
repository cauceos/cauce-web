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
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the Cauce waitlist</title>
</head>
<body style="margin:0;padding:0;background:#0E0F0D;">

<table cellpadding="0" cellspacing="0" border="0" width="100%"
       style="background:#0E0F0D;font-family:Georgia,'Times New Roman',serif;">
  <tr>
    <td align="center" style="padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" width="600"
             style="max-width:600px;width:100%;">

        <!-- HEADER: symbol + wordmark -->
        <tr>
          <td align="center" style="padding:60px 40px 30px;">
            <svg width="120" height="90" viewBox="0 0 80 60"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M 4 22 Q 40 72 76 22" stroke="#4A4B42"
                    stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <path d="M 12 22 Q 40 62 68 22" stroke="#5A8CAB"
                    stroke-width="2.4" stroke-linecap="round" fill="none"/>
              <path d="M 20 22 Q 40 52 60 22" stroke="#6FAF82"
                    stroke-width="3.0" stroke-linecap="round" fill="none"/>
              <path d="M 28 22 Q 40 42 52 22" stroke="#2DD4C0"
                    stroke-width="4.0" stroke-linecap="round" fill="none"/>
              <circle cx="40" cy="40" r="3" fill="#2DD4C0"/>
            </svg>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 40px 20px;">
            <span style="font-family:Georgia,serif;font-size:36px;
                         font-weight:400;color:#ECEEE8;letter-spacing:-1px;">
              Cau<em style="color:#2DD4C0;font-style:italic;">ce</em>
            </span>
          </td>
        </tr>

        <!-- Decorative line -->
        <tr>
          <td align="center" style="padding:10px 40px;">
            <div style="width:60px;height:1px;background:#2DD4C0;
                        opacity:0.4;margin:0 auto;"></div>
          </td>
        </tr>

        <!-- Eyebrow -->
        <tr>
          <td align="center" style="padding:20px 40px 40px;">
            <span style="font-family:'Courier New',monospace;font-size:11px;
                         color:#2DD4C0;letter-spacing:4px;
                         text-transform:uppercase;">
              CONFIRMATION · WAITLIST
            </span>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:0 60px 32px;">
            <h1 style="font-family:Georgia,serif;font-size:42px;
                       font-weight:400;color:#ECEEE8;line-height:1.15;
                       letter-spacing:-1.5px;margin:0;">
              You're on the Cauce <em style="color:#2DD4C0;font-style:italic;">waitlist</em>.
            </h1>
          </td>
        </tr>

        <!-- Body paragraphs -->
        <tr>
          <td style="padding:0 60px 24px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      line-height:1.7;color:#C8CAC2;margin:0;">
              Hi,
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 60px 24px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      line-height:1.7;color:#C8CAC2;margin:0;">
              Thanks for joining. You're now on the list to hear about our open infrastructure for AI agents — the European one, the honest one, the one built right.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 60px 48px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      line-height:1.7;color:#C8CAC2;margin:0;">
              We'll write again when there's something real worth showing.
            </p>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:0 60px 60px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      color:#ECEEE8;margin:0;">
              — <em style="color:#2DD4C0;font-style:italic;">Cauce</em>
            </p>
          </td>
        </tr>

        <!-- Technical footer -->
        <tr>
          <td style="padding:30px 60px;border-top:1px solid #252620;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:'Courier New',monospace;font-size:11px;
                           color:#5F605A;letter-spacing:1px;">
                  OPEN SOURCE · BUILT IN PUBLIC · 2026
                </td>
                <td align="right">
                  <a href="https://cauce.dev"
                     style="font-family:'Courier New',monospace;font-size:11px;
                            color:#2DD4C0;text-decoration:none;
                            letter-spacing:2px;">
                    CAUCE.DEV →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

const CONFIRMATION_HTML_ES = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Te has unido a la waitlist de Cauce</title>
</head>
<body style="margin:0;padding:0;background:#0E0F0D;">

<table cellpadding="0" cellspacing="0" border="0" width="100%"
       style="background:#0E0F0D;font-family:Georgia,'Times New Roman',serif;">
  <tr>
    <td align="center" style="padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" width="600"
             style="max-width:600px;width:100%;">

        <!-- HEADER: symbol + wordmark -->
        <tr>
          <td align="center" style="padding:60px 40px 30px;">
            <svg width="120" height="90" viewBox="0 0 80 60"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M 4 22 Q 40 72 76 22" stroke="#4A4B42"
                    stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <path d="M 12 22 Q 40 62 68 22" stroke="#5A8CAB"
                    stroke-width="2.4" stroke-linecap="round" fill="none"/>
              <path d="M 20 22 Q 40 52 60 22" stroke="#6FAF82"
                    stroke-width="3.0" stroke-linecap="round" fill="none"/>
              <path d="M 28 22 Q 40 42 52 22" stroke="#2DD4C0"
                    stroke-width="4.0" stroke-linecap="round" fill="none"/>
              <circle cx="40" cy="40" r="3" fill="#2DD4C0"/>
            </svg>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 40px 20px;">
            <span style="font-family:Georgia,serif;font-size:36px;
                         font-weight:400;color:#ECEEE8;letter-spacing:-1px;">
              Cau<em style="color:#2DD4C0;font-style:italic;">ce</em>
            </span>
          </td>
        </tr>

        <!-- Decorative line -->
        <tr>
          <td align="center" style="padding:10px 40px;">
            <div style="width:60px;height:1px;background:#2DD4C0;
                        opacity:0.4;margin:0 auto;"></div>
          </td>
        </tr>

        <!-- Eyebrow -->
        <tr>
          <td align="center" style="padding:20px 40px 40px;">
            <span style="font-family:'Courier New',monospace;font-size:11px;
                         color:#2DD4C0;letter-spacing:4px;
                         text-transform:uppercase;">
              CONFIRMACIÓN · WAITLIST
            </span>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td style="padding:0 60px 32px;">
            <h1 style="font-family:Georgia,serif;font-size:42px;
                       font-weight:400;color:#ECEEE8;line-height:1.15;
                       letter-spacing:-1.5px;margin:0;">
              Te has unido a la <em style="color:#2DD4C0;font-style:italic;">waitlist</em> de Cauce.
            </h1>
          </td>
        </tr>

        <!-- Body paragraphs -->
        <tr>
          <td style="padding:0 60px 24px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      line-height:1.7;color:#C8CAC2;margin:0;">
              Hola,
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 60px 24px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      line-height:1.7;color:#C8CAC2;margin:0;">
              Gracias por unirte. Estás en la lista para recibir noticias sobre nuestra infraestructura abierta para agentes de IA — la europea, la honesta, la bien hecha.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 60px 48px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      line-height:1.7;color:#C8CAC2;margin:0;">
              Te escribiremos de nuevo cuando haya algo real que merezca enseñarse.
            </p>
          </td>
        </tr>

        <!-- Signature -->
        <tr>
          <td style="padding:0 60px 60px;">
            <p style="font-family:Georgia,serif;font-size:18px;
                      color:#ECEEE8;margin:0;">
              — <em style="color:#2DD4C0;font-style:italic;">Cauce</em>
            </p>
          </td>
        </tr>

        <!-- Technical footer -->
        <tr>
          <td style="padding:30px 60px;border-top:1px solid #252620;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:'Courier New',monospace;font-size:11px;
                           color:#5F605A;letter-spacing:1px;">
                  OPEN SOURCE · BUILT IN PUBLIC · 2026
                </td>
                <td align="right">
                  <a href="https://cauce.dev"
                     style="font-family:'Courier New',monospace;font-size:11px;
                            color:#2DD4C0;text-decoration:none;
                            letter-spacing:2px;">
                    CAUCE.DEV →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
