// Branded, inline-styled HTML emails for the contact form.
// Email clients strip <style>/external CSS and are picky about layout, so everything
// here is table-based with inline styles and web-safe fonts.

const BRAND = {
  ink: "#14110e", // warm charcoal
  paper: "#faf6f0", // page background
  card: "#ffffff",
  text: "#2b2622",
  muted: "#6f675e",
  accent: "#f0803c", // amber
  border: "#ece2d5",
};

/** Escape user-supplied text before putting it in HTML. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\r?\n/g, "<br />");
}

type Email = { subject: string; html: string; text: string };

/** Outer shell: paper background, charcoal header with the wordmark, white card, footer. */
function shell(opts: { preheader: string; heading: string; body: string }): string {
  const { preheader, heading, body } = opts;
  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:${BRAND.paper};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">
            <tr>
              <td style="background:${BRAND.ink};border-radius:14px 14px 0 0;padding:22px 28px;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:600;color:#faf6f0;letter-spacing:-0.01em;">Talha&nbsp;Shaikh</span>
                <span style="font-family:'Courier New',monospace;font-size:12px;color:${BRAND.accent};float:right;padding-top:6px;">talhaweb.xyz</span>
              </td>
            </tr>
            <tr>
              <td style="background:${BRAND.card};border:1px solid ${BRAND.border};border-top:none;border-radius:0 0 14px 14px;padding:32px 28px;">
                <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.25;color:${BRAND.ink};font-weight:600;">${heading}</h1>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 28px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:${BRAND.muted};">
                Sent from the contact form at
                <a href="https://talhaweb.xyz" style="color:${BRAND.accent};text-decoration:none;">talhaweb.xyz</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function quoteBlock(message: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 0;">
    <tr>
      <td style="border-left:3px solid ${BRAND.accent};background:${BRAND.paper};border-radius:0 8px 8px 0;padding:14px 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${BRAND.text};">
        ${nl2br(message)}
      </td>
    </tr>
  </table>`;
}

function paragraph(html: string): string {
  return `<p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${BRAND.text};">${html}</p>`;
}

/** Auto-reply sent to the visitor who submitted the form. */
export function autoReplyEmail(input: { name: string; message: string }): Email {
  const firstName = escapeHtml(input.name.split(/\s+/)[0] || input.name);
  const body =
    paragraph(`Hi ${firstName},`) +
    paragraph(`Thanks for reaching out — your message came through and it's now in my inbox. I read every message myself and I'll get back to you personally, usually within a day or two.`) +
    paragraph(`Just so you have it, here's a copy of what you sent:`) +
    quoteBlock(input.message) +
    paragraph(`Talk soon,<br /><strong>Talha</strong>`);
  const subject = "Thanks for reaching out — I got your message";
  const text = `Hi ${input.name},

Thanks for reaching out — your message came through and it's now in my inbox. I read every message myself and I'll get back to you personally, usually within a day or two.

Here's a copy of what you sent:

${input.message}

Talk soon,
Talha
talhaweb.xyz`;
  return { subject, html: shell({ preheader: "I got your message and will reply soon.", heading: "Thanks for reaching out 👋", body }), text };
}

/** Notification sent to Talha when someone submits the form. */
export function notificationEmail(input: { name: string; email: string; message: string }): Email {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const body =
    paragraph(`<strong>${name}</strong> just contacted you through your portfolio.`) +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 6px;">
       <tr>
         <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};width:70px;">Name</td>
         <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${BRAND.text};">${name}</td>
       </tr>
       <tr>
         <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:${BRAND.muted};">Email</td>
         <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;"><a href="mailto:${email}" style="color:${BRAND.accent};text-decoration:none;">${email}</a></td>
       </tr>
     </table>` +
    paragraph(`<span style="color:${BRAND.muted};font-size:13px;">Message</span>`) +
    quoteBlock(input.message) +
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 0;">
       <tr>
         <td style="background:${BRAND.ink};border-radius:8px;">
           <a href="mailto:${email}?subject=Re:%20your%20message" style="display:inline-block;padding:11px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#faf6f0;text-decoration:none;">Reply to ${name} ↗</a>
         </td>
       </tr>
     </table>`;
  const subject = `New contact from ${input.name}`;
  const text = `${input.name} just contacted you through your portfolio.

Name:  ${input.name}
Email: ${input.email}

Message:
${input.message}`;
  return { subject, html: shell({ preheader: `${input.name}: ${input.message.slice(0, 90)}`, heading: "New message from your portfolio", body }), text };
}
