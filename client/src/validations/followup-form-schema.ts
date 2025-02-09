import { z } from 'zod'

export const followUpFormSchema = z.object({
  muscleGroup: z.string().min(1, 'O grupo muscular é obrigatório'),
  date: z.string().min(1, 'A data é obrigatória'),
  notes: z.string().min(1, 'As observações são obrigatórias'),
  teacherId: z.string().min(1, 'O professor é obrigatório'),
  studentId: z.string().min(1, 'O aluno é obrigatório'),
})
