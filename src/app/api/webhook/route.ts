import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const event = await req.json();

    // Check if the event is an incoming email
    if (event.type === 'email.received') {
      const { email_id, from, subject } = event.data;

      // 1. Fetch the full email content using the email_id
      // Note: In a real production environment, you'd use the Resend SDK 
      // to retrieve the body, but for this webhook signal, we'll 
      // notify you that a manual email has arrived.
      
      await resend.emails.send({
        from: 'System <hello@talhaweb.xyz>',
        to: ['talha369852@gmail.com'],
        subject: `[FORWARDED] Manual Email from ${from}: ${subject}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #7c3aed; border-radius: 10px;">
            <h2 style="color: #7c3aed;">Manual Email Received!</h2>
            <p>Someone just emailed <strong>hello@talhaweb.xyz</strong> directly.</p>
            <hr />
            <p><strong>From:</strong> ${from}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Email ID:</strong> ${email_id}</p>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              Log in to your Resend Dashboard to read the full body and reply.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
