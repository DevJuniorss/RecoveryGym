import { z } from 'zod'

export const teacherFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  cpf: z.string().min(14, 'CPF inválido').max(14, 'CPF inválido'),
  cref: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  username: z.string().min(1, 'O usuário é obrigatório'),
  password: z.string().optional(),
  // schedules: z.array(
  //   z.object({
  //     startTime: z.string(),
  //     endTime: z.string(),
  //   }),
  // ),
})
