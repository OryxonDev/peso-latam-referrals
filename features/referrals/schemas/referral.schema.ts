import { z } from 'zod';
import { getTranslation } from '@/lib/i18n/getTranslation';

export const createReferralSchema = z.object({
  name: z.string().min(1, getTranslation('validation.nameRequired')),
  email: z.email(getTranslation('validation.emailInvalid')),
  phone: z.string().min(1, getTranslation('validation.phoneRequired')),
});

export type CreateReferralFormData = z.infer<typeof createReferralSchema>;

