import { Resend } from 'resend';

// process.env at runtime on Vercel serverless, import.meta.env in local dev.
const apiKey = process.env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;

export const resend = new Resend(apiKey);
