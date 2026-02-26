// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    // ── 1. Notify Talha ──────────────────────────────────────────
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use your verified domain later
      to: process.env.MY_EMAIL!, // Your personal email
      replyTo: email,
      subject: `📬 New Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background:#050508;font-family:'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#0d0b1a;border:1px solid rgba(139,92,246,0.2);border-radius:16px;overflow:hidden;">
            
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:28px 32px;">
              <h1 style="margin:0;color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                📬 New Portfolio Message
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:13px;">
                Someone reached out via your contact form
              </p>
            </div>

            <!-- Body -->
            <div style="padding:32px;">

              <!-- Sender info -->
              <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.15);border-radius:12px;padding:20px;margin-bottom:24px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:6px 0;color:#9ca3af;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;width:80px;">Name</td>
                    <td style="padding:6px 0;color:#e5e7eb;font-size:14px;font-weight:600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#9ca3af;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
                    <td style="padding:6px 0;">
                      <a href="mailto:${email}" style="color:#a78bfa;font-size:14px;text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:6px 0;color:#9ca3af;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Subject</td>
                    <td style="padding:6px 0;color:#e5e7eb;font-size:14px;font-weight:600;">${subject}</td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div>
                <p style="margin:0 0 10px;color:#9ca3af;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;">
                  <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.8;white-space:pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${email}?subject=Re: ${subject}" 
                   style="display:inline-block;background:linear-gradient(to right,#7c3aed,#db2777);color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;">
                  Reply to ${name} →
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;color:#4b5563;font-size:11px;font-family:monospace;">
                Sent from your portfolio contact form · talha.dev
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // ── 2. Auto-reply to client ──────────────────────────────────
    await resend.emails.send({
      from: 'Talha Shaikh <onboarding@resend.dev>', // Replace with your domain later
      to: email,
      subject: `✅ Got your message, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background:#f8f7ff;font-family:'Segoe UI',sans-serif;">
          <div style="max-width:560px;margin:40px auto;background:#ffffff;border:1px solid rgba(139,92,246,0.15);border-radius:16px;overflow:hidden;box-shadow:0 4px 40px rgba(109,40,217,0.08);">

            <!-- Header -->
            <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:32px;">
              <div style="width:52px;height:52px;background:rgba(255,255,255,0.15);border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                <span style="font-size:24px;">✨</span>
              </div>
              <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                Thanks, ${name}!
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;line-height:1.6;">
                Your message has been received. I'll get back to you soon!
              </p>
            </div>

            <!-- Body -->
            <div style="padding:32px;">

              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.8;">
                Hey <strong>${name}</strong>, thanks for reaching out through my portfolio. 
                I've received your message about <strong>"${subject}"</strong> and will review it shortly.
              </p>

              <!-- What to expect -->
              <div style="background:#f8f7ff;border:1px solid rgba(139,92,246,0.12);border-radius:12px;padding:20px;margin-bottom:24px;">
                <p style="margin:0 0 14px;color:#7c3aed;font-size:12px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">
                  What happens next
                </p>
                <div style="display:flex;flex-direction:column;gap:12px;">
                  <div style="display:flex;align-items:flex-start;gap:12px;">
                    <div style="width:24px;height:24px;background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                      <span style="color:#fff;font-size:11px;font-weight:700;">1</span>
                    </div>
                    <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.5;">I'll review your message carefully</p>
                  </div>
                  <div style="display:flex;align-items:flex-start;gap:12px;">
                    <div style="width:24px;height:24px;background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                      <span style="color:#fff;font-size:11px;font-weight:700;">2</span>
                    </div>
                    <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.5;">Expect a reply within <strong>24 hours</strong> — usually much sooner</p>
                  </div>
                  <div style="display:flex;align-items:flex-start;gap:12px;">
                    <div style="width:24px;height:24px;background:linear-gradient(135deg,#7c3aed,#db2777);border-radius:6px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                      <span style="color:#fff;font-size:11px;font-weight:700;">3</span>
                    </div>
                    <p style="margin:0;color:#4b5563;font-size:14px;line-height:1.5;">We'll discuss how I can help bring your idea to life</p>
                  </div>
                </div>
              </div>

              <!-- Message recap -->
              <div style="background:#f3f4f6;border-radius:10px;padding:16px;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#9ca3af;font-size:11px;font-family:monospace;text-transform:uppercase;letter-spacing:0.1em;">Your message</p>
                <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.7;font-style:italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
              </div>

              <!-- Social links -->
              <div style="text-align:center;margin-bottom:8px;">
                <p style="margin:0 0 14px;color:#9ca3af;font-size:12px;">Connect with me while you wait</p>
                <div style="display:flex;justify-content:center;gap:12px;">
                  <a href="https://github.com/talhashaikh" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/talhashaikh" style="display:inline-block;background:#eff6ff;color:#1d4ed8;text-decoration:none;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;">
                    LinkedIn
                  </a>
                  <a href="https://twitter.com/talhashaikh" style="display:inline-block;background:#f5f3ff;color:#7c3aed;text-decoration:none;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;">
                    Twitter / X
                  </a>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding:16px 32px 24px;text-align:center;">
              <p style="margin:0;color:#d1d5db;font-size:11px;">
                This is an automated confirmation from <strong style="color:#a78bfa;">Talha Shaikh's</strong> portfolio.<br>
                Please don't reply to this email — I'll reach out to you directly.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}