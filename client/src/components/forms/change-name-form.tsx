'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changeNameFormSchema } from '@/validations/change-name-form-schema'
import { ChangeNameFormData } from '@/types/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { changeName } from '@/services/user-service/user-service'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/shadcn/label'
import { Input } from '@/components/shadcn/input'

interface ChangeNameFormProps {
  onSuccess: () => void
  currentName: string
}

export default function ChangeNameForm({
  onSuccess,
  currentName,
}: ChangeNameFormProps) {
  const queryClient = useQueryClient()
  const { handleSubmit, register } = useForm<ChangeNameFormData>({
    resolver: zodResolver(changeNameFormSchema),
    defaultValues: {
      newName: currentName,
    },
  })

  const { mutate } = useMutation({
    mutationFn: changeName,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
      onSuccess()
    },
  })

  return (
    <form id="change-name-form" onSubmit={handleSubmit((data) => mutate(data))}>
      <Label htmlFor="name" className="text-right">
        Novo nome
      </Label>
      <Input id="name" className="mt-1" {...register('newName')} />
    </form>
  )
}
