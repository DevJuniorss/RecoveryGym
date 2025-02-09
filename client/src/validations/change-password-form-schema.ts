import { z } from 'zod'

export const changePasswordFormSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
})
