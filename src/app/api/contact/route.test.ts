import { describe, it, expect, vi, beforeEach } from "vitest";

// Prevent real emails: mock resend before importing the route.
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: vi.fn().mockResolvedValue({ data: { id: "test" }, error: null }) };
  },
}));

import { POST } from "./route";

function req(body: unknown, ip = "1.2.3.4") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const valid = { name: "Jane Dev", email: "jane@example.com", message: "Hello, I'd like to talk about a role." };

beforeEach(() => {
  process.env.RESEND_API_KEY = "test";
  process.env.CONTACT_TO_EMAIL = "to@example.com";
});

describe("POST /api/contact", () => {
  it("accepts a valid submission", async () => {
    const res = await POST(req(valid, "10.0.0.1"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rejects invalid input with 400", async () => {
    const res = await POST(req({ name: "x", email: "nope", message: "short" }, "10.0.0.2"));
    expect(res.status).toBe(400);
  });

  it("rejects when honeypot is filled", async () => {
    const res = await POST(req({ ...valid, company: "spam co" }, "10.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("rate-limits after 5 requests from one IP", async () => {
    const ip = "10.0.0.99";
    for (let i = 0; i < 5; i++) {
      const ok = await POST(req(valid, ip));
      expect(ok.status).toBe(200);
    }
    const blocked = await POST(req(valid, ip));
    expect(blocked.status).toBe(429);
  });
});
