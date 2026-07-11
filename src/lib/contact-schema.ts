import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().pipe(z.email("Please enter a valid email.")),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(2000),
  // Honeypot: must be empty. Bots fill it.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
