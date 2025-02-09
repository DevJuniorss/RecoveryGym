'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeUsernameFormSchema } from '@/validations/change-username-form-schema'
import { ChangeUsernameFormData } from '@/types/validations'
import { changeUsername } from '@/services/user-service/user-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/shadcn/input'
import { Label } from '@/components/shadcn/label'

interface ChangeUsernameFormProps {
  onSuccess: () => void
  currentUsername: string
}

export default function ChangeUsernameForm({
  currentUsername,
  onSuccess,
}: ChangeUsernameFormProps) {
  const queryClient = useQueryClient()
  const { handleSubmit, register } = useForm<ChangeUsernameFormData>({
    resolver: zodResolver(changeUsernameFormSchema),
    defaultValues: {
      newUsername: currentUsername,
    },
  })

  const { mutate } = useMutation({
    mutationFn: changeUsername,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', 'settings'],
      })
      onSuccess()
    },
  })

  return (
    <form
      id="change-username-form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <div className="mt-4">
        <Label htmlFor="username" className="text-right">
          Novo usuário
        </Label>
        <Input id="username" className="mt-1" {...register('newUsername')} />
      </div>
    </form>
  )
}
