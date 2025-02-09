import { z } from 'zod'

export const changeUsernameFormSchema = z.object({
  newUsername: z.string(),
})
