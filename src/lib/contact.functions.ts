import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  email: z.string().email().max(120).optional().or(z.literal("")),
  post: z.string().min(1).max(60),
  state: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { createLead } = await import("./contact.server");
    const lead = await createLead({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      post: data.post,
      state: data.state || undefined,
      message: data.message || undefined,
    });
    return { ok: true as const, id: lead.id };
  });
