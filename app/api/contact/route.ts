import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { escapeHtml, sendMail } from '@/lib/email';

/**
 * Public contact form endpoint. Stores the message in the admin inbox first
 * (so nothing is lost if email delivery fails), then sends the notification.
 */
export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    if (String(message).length > 5000) {
      return NextResponse.json({ error: 'Message is too long' }, { status: 400 });
    }

    const sb = createSupabaseAdminClient();
    let stored = false;
    if (sb) {
      const { error } = await sb.from('messages').insert({
        name: String(name).slice(0, 120),
        email: String(email).slice(0, 200),
        message: String(message),
        status: 'unread',
      });
      if (error) console.error('Could not store message:', error.message);
      else stored = true;
    }

    const senderEmail = process.env.BREVO_SENDER_EMAIL;
    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br>');

    const sent = senderEmail
      ? await sendMail({
          to: senderEmail,
          toName: process.env.BREVO_SENDER_NAME,
          subject: `New contact form message from ${name}`,
          replyTo: { email: String(email), name: String(name) },
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f5f5f5;">
  <table role="presentation" style="width:100%;border-collapse:collapse;background-color:#f5f5f5;padding:20px;">
    <tr><td align="center">
      <table role="presentation" style="max-width:600px;width:100%;border-collapse:collapse;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%);padding:36px 30px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">New contact message</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">From your portfolio contact form</p>
          </td>
        </tr>
        <tr>
          <td style="padding:34px 30px;">
            <p style="margin:0 0 6px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
            <p style="margin:0 0 24px;color:#1f2937;font-size:17px;font-weight:600;">${safeName}</p>
            <p style="margin:0 0 6px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
            <p style="margin:0 0 24px;"><a href="mailto:${safeEmail}" style="color:#667eea;font-size:16px;text-decoration:none;">${safeEmail}</a></p>
            <p style="margin:0 0 10px;color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
            <div style="background-color:#f9fafb;border-left:3px solid #667eea;padding:18px;border-radius:8px;">
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.6;">${safeMessage}</p>
            </div>
            <div style="text-align:center;margin-top:34px;padding-top:26px;border-top:1px solid #e5e7eb;">
              <a href="mailto:${safeEmail}?subject=Re: your message" style="display:inline-block;background:linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%);color:#ffffff;text-decoration:none;padding:13px 30px;border-radius:8px;font-weight:600;font-size:15px;">Reply to ${safeName}</a>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
        })
      : { ok: false, error: 'Email is not configured.' };

    if (!sent.ok && !stored) {
      console.error('Contact form failed:', sent.error);
      return NextResponse.json(
        { error: 'Could not send your message. Please email me directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Message received' }, { status: 200 });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
