import { z } from "zod";

export const loginSchema = z.object({
  mobile: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
