import { z } from 'zod';

export const createReferralSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('El email debe ser válido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
});

export type CreateReferralFormData = z.infer<typeof createReferralSchema>;

