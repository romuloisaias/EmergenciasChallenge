import { z } from 'zod';

export const createContactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha debe ser YYYY-MM-DD'),
  phones: z
    .array(
      z.object({
        number: z.string().min(1),
        phoneTypeId: z.number(),
      }),
    )
    .optional(),
  addresses: z
    .array(
      z.object({
        locality: z.string().min(1),
        street: z.string().min(1),
        number: z.string().min(1),
        notes: z.string().optional(),
      }),
    )
    .optional(),
});

export const updateContactSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha debe ser YYYY-MM-DD')
    .optional(),
});

export const searchContactByPhoneSchema = z.object({
  number: z.string().min(1),
  phoneTypeId: z.string().transform(Number),
});

export const createActivitySchema = z.object({
  personId: z.number(),
  activityType: z.enum(['call', 'meeting', 'email']),
  activityDate: z.string().datetime(),
  description: z.string().optional(),
});

export const searchActivitySchema = z.object({
  personId: z.string().transform(Number),
  activityType: z.enum(['call', 'meeting', 'email']),
});
