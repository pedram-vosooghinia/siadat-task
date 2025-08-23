import { z } from "zod";

export const loginSchema = z.object({
  mobile: z
    .string()
    .regex(/^\+98[0-9]{10}$/, "The mobile number must start with +98 and contain 10 digits."),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
