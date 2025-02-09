import { z } from 'zod'

export const changeNameFormSchema = z.object({
  newName: z
    .string()
    .min(1, { message: 'Este campo não pode ficar em branco.' }),
})
