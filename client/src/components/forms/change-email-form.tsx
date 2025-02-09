'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeEmailFormSchema } from '@/validations/change-email-form-schema'
import { ChangeEmailFormData } from '@/types/validations'
import { changeEmail } from '@/services/teacher-service/teacher-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'

interface ChangeEmailFormProps {
  onSuccess: () => void
  currentEmail?: string
}

export default function ChangeEmailForm({
  currentEmail,
  onSuccess,
}: ChangeEmailFormProps) {
  const queryClient = useQueryClient()
  const { handleSubmit, register } = useForm<ChangeEmailFormData>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      newEmail: currentEmail || '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: changeEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', 'settings'],
      })
      onSuccess()
    },
  })

  return (
    <form
      id="change-email-form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <div className="mt-4">
        <Label htmlFor="email" className="text-right">
          Novo e-mail
        </Label>
        <Input
          id="email"
          className="mt-1"
          type="email"
          placeholder="Digite seu novo e-mail"
          {...register('newEmail')}
        />
      </div>
    </form>
  )
}
