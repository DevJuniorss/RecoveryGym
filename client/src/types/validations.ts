import { changePasswordFormSchema } from '@/validations/change-password-form-schema'
import { changeUsernameFormSchema } from '@/validations/change-username-form-schema'
import { changeEmailFormSchema } from '@/validations/change-email-form-schema'
import { changePhoneFormSchema } from '@/validations/change-phone-form-schema'
import { changeNameFormSchema } from '@/validations/change-name-form-schema'
import { followUpFormSchema } from '@/validations/followup-form-schema'
import { teacherFormSchema } from '@/validations/teacher-form-schema'
import { studentFormSchema } from '@/validations/student-form-schema'
import { loginFormSchema } from '@/validations/login-form-schema'
import { z } from 'zod'

export type TeacherFormData = z.infer<typeof teacherFormSchema>

export type ChangeEmailFormData = z.infer<typeof changeEmailFormSchema>

export type ChangePhoneFormData = z.infer<typeof changePhoneFormSchema>

export type ChangeUsernameFormData = z.infer<typeof changeUsernameFormSchema>

export type ChangeNameFormData = z.infer<typeof changeNameFormSchema>

export type ChangePasswordFormData = z.infer<typeof changePasswordFormSchema>

export type LoginFormData = z.infer<typeof loginFormSchema>

export type StudentFormData = z.infer<typeof studentFormSchema>

export type FollowUpFormData = z.infer<typeof followUpFormSchema>
