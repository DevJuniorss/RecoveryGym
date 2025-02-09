'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changePhoneFormSchema } from '@/validations/change-phone-form-schema'
import { ChangePhoneFormData } from '@/types/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePhone } from '@/services/teacher-service/teacher-service'
import { phoneMask } from '@/utils/phoneMask'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/shadcn/label'
import { Input } from '@/components/shadcn/input'

interface ChangePhoneFormProps {
  onSuccess: () => void
  currentPhone?: string
}

export default function ChangePhoneForm({
  onSuccess,
  currentPhone,
}: ChangePhoneFormProps) {
  const queryClient = useQueryClient()
  const { handleSubmit, register } = useForm<ChangePhoneFormData>({
    resolver: zodResolver(changePhoneFormSchema),
    defaultValues: {
      newPhone: currentPhone || '',
    },
  })

  const { mutate } = useMutation({
    mutationFn: changePhone,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['profile', 'settings'],
      })
      onSuccess()
    },
  })

  return (
    <form
      id="change-phone-form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <Label htmlFor="phone" className="text-right">
        Novo telefone
      </Label>
      <Input
        id="phone"
        className="mt-1"
        placeholder="Digite apenas números"
        {...register('newPhone', {
          onChange: phoneMask,
        })}
      />
    </form>
  )
}
