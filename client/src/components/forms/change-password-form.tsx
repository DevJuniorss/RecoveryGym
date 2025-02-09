'use client'

import { changePasswordFormSchema } from '@/validations/change-password-form-schema'
import { ChangePasswordFormData } from '@/types/validations'
import { changePassword } from '@/services/user-service/user-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'

interface ChangePasswordFormProps {
  onSuccess: () => void
}

export default function ChangePasswordForm({
  onSuccess,
}: ChangePasswordFormProps) {
  const { handleSubmit, register } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
  })

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      onSuccess()
    },
  })

  return (
    <form
      id="change-password-form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <div className="mt-4">
        <Label htmlFor="oldPassword" className="text-right">
          Senha antiga *
        </Label>
        <Input
          id="oldPassword"
          className="mt-1"
          type="password"
          {...register('oldPassword')}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="newPassword" className="text-right">
          Nova Senha *
        </Label>
        <Input
          id="newPassword"
          className="mt-1"
          type="password"
          {...register('newPassword')}
        />
      </div>

      <div className="mt-4">
        <Label htmlFor="confirmNewPassword" className="text-right">
          Repetir Senha *
        </Label>
        <Input
          id="confirmNewPassword"
          className="mt-1"
          type="password"
          {...register('confirmNewPassword')}
        />
      </div>
    </form>
  )
}
