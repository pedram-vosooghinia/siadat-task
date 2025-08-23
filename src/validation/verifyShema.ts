import { z } from "zod";

export const verifySchema = z.object({
  verifyCode: z
    .string()
    .regex(/^\d{5}$/, "The verify code must contain exactly 5 digits."),
});

export type VerifyFormInputs = z.infer<typeof verifySchema>;
