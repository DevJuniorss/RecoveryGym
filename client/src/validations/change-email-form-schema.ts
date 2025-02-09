import { z } from 'zod'

export const changeEmailFormSchema = z.object({
  newEmail: z
    .string()
    .email({ message: 'Digite um e-mail válido' })
    .min(1, { message: 'O e-mail é obrigatório' }),
})
