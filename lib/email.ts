import 'server-only';

/**
 * Transactional email via Brevo. Used by the public contact form and by
 * admin replies from the message inbox.
 */

export interface MailInput {
  to: string;
  toName?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: { email: string; name?: string };
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendMail(
  input: MailInput
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME;

  if (!apiKey || !senderEmail || !senderName) {
    return { ok: false, error: 'Email is not configured (missing Brevo keys in .env).' };
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: input.to, name: input.toName || input.to }],
        ...(input.replyTo ? { replyTo: input.replyTo } : {}),
        subject: input.subject,
        textContent: input.text,
        htmlContent: input.html ?? escapeHtml(input.text).replace(/\n/g, '<br>'),
      }),
    });

    if (!res.ok) {
      return { ok: false, error: `Brevo error ${res.status}: ${await res.text()}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Send failed.' };
  }
}
