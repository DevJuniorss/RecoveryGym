import { z } from 'zod'

export const studentFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z
    .string()
    .email('E-mail inválido')
    .nullable()
    .optional()
    .or(z.literal('')),
  phone: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  teacherId: z.string().optional(),
  anamnesis: z
    .object({
      painLocation: z.string().optional(),
      painStartDate: z.string().optional(),
      painOnset: z.string().optional(),
      painProgression: z.string().optional(),
      painType: z.string().optional(),
      painDuration: z.string().optional(),
      painRadiation: z.string().optional(),
      painIntensity: z.string().optional(),
      painActivityLimitation: z.string().optional(),
      painPeakTime: z.string().optional(),
      painReliefFactors: z.string().optional(),
      painWorseningFactors: z.string().optional(),
      painRelatedSymptoms: z.string().optional(),
    })
    .optional()
    .nullable(),
})
