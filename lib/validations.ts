import { z } from "zod";

/**
 * Security & Input Sanitization Helper
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Type-Safe Zod Validation Schemas
 */

export const volunteerSchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.").max(100)),
  email: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().email("Please enter a valid email address.")),
  phone: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(7, "Please enter a valid phone number.")),
  location: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Please enter your district or city.")),
  age: z.coerce
    .number()
    .min(16, "Age must be between 16 and 100.")
    .max(100, "Age must be between 16 and 100."),
  track: z.enum(["event-logistics", "medical-camps", "tree-plantation", "relief-work"], {
    message: "Please select a valid volunteer track.",
  }),
  availability: z.enum(["weekends", "weekdays", "both"], {
    message: "Please select a valid availability option.",
  }),
  message: z.string().transform(sanitizeInput).optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.").max(100)),
  email: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().email("Please enter a valid email address.")),
  phone: z.string().transform(sanitizeInput).optional(),
  subject: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Subject must be at least 2 characters.").max(200)),
  message: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(10, "Message must be at least 10 characters.").max(5000)),
});

export const communitySchema = z.object({
  name: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(2, "Full name must be at least 2 characters.")),
  contact: z
    .string()
    .transform(sanitizeInput)
    .pipe(z.string().min(5, "Please enter a valid phone number or email address.")),
  interest: z.enum(["blood-donation", "tree-plantation", "charity-work", "all"], {
    message: "Please select a valid area of interest.",
  }),
  message: z.string().transform(sanitizeInput).optional(),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type CommunityInput = z.infer<typeof communitySchema>;
