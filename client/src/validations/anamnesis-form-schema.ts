import { z } from 'zod'

export const anamnesisFormSchema = z.object({
  painLocation: z.string().min(1, 'A localização da dor é obrigatória'),
  painStartDate: z.string().min(1, 'A data de início é obrigatória'),
  painOnset: z.string().min(1, 'Como começou é obrigatório'),
  painProgression: z.string().min(1, 'A evolução é obrigatória'),
  painType: z.string().min(1, 'O tipo de dor é obrigatório'),
  painDuration: z.string().min(1, 'A duração é obrigatória'),
  painRadiation: z.string().min(1, 'A radiação é obrigatória'),
  painIntensity: z.string().min(1, 'A intensidade é obrigatória'),
  painActivityLimitation: z.string().min(1, 'A limitação é obrigatória'),
  painPeakTime: z.string().min(1, 'O horário de pico é obrigatório'),
  painReliafFactors: z.string().min(1, 'Os fatores de alívio são obrigatórios'),
  painWorseningFactors: z
    .string()
    .min(1, 'Os fatores de piora são obrigatórios'),
  painRelatedSymptoms: z
    .string()
    .min(1, 'Os sintomas relacionados são obrigatórios'),
})
