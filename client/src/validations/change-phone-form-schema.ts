import { z } from 'zod'

export const changePhoneFormSchema = z.object({
  newPhone: z.string().min(1, { message: 'Campo obrigatório' }),
})
