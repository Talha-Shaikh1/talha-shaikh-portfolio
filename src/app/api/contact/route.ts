import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/rate-limit";
import { autoReplyEmail, notificationEmail } from "@/lib/emails";

export const runtime = "nodejs";

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0]!.trim() : "unknown";
}

export async function POST(req: Request): Promise<Response> {
  const { ok } = rateLimit(clientIp(req));
  if (!ok) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const { name, email, message, company } = parsed.data;
  if (company) return Response.json({ error: "Invalid input." }, { status: 400 }); // honeypot tripped

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Sender on the verified talhaweb.xyz domain. Override via env if you want a different mailbox.
  const from = process.env.CONTACT_FROM_EMAIL || "Talha Shaikh <hello@talhaweb.xyz>";
  if (!apiKey || !to) {
    return Response.json({ error: "Contact is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const notify = notificationEmail({ name, email, message });
  const reply = autoReplyEmail({ name, message });

  // Notify Talha — this one must succeed. Replies go straight to the visitor.
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: notify.subject,
    html: notify.html,
    text: notify.text,
  });
  if (error) return Response.json({ error: "Could not send message." }, { status: 502 });

  // Auto-reply to the visitor. Best-effort: if it fails, the message still got through,
  // so don't fail the request. Replies to the auto-reply land in Talha's inbox.
  await resend.emails
    .send({
      from,
      to: email,
      replyTo: to,
      subject: reply.subject,
      html: reply.html,
      text: reply.text,
    })
    .catch(() => {});

  return Response.json({ ok: true }, { status: 200 });
}
