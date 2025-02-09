'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FollowUp } from '@/types/followup'
import { FollowUpFormData } from '@/types/validations'
import { followUpFormSchema } from '@/validations/followup-form-schema'
import { getAllTeachers } from '@/services/teacher-service/teacher-service'
import { Label } from '@/components/shadcn/label'
import { Input } from '@/components/shadcn/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select'
import InputError from '../ui/input-error'
import { useEffect } from 'react'

interface FollowUpFormProps {
  onSubmit: (data: FollowUpFormData) => void
  studentId?: string
  followUp?: FollowUp
}

export default function FollowUpForm({
  onSubmit,
  followUp,
  studentId,
}: FollowUpFormProps) {
  const { data: teachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  })

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FollowUpFormData>({
    resolver: zodResolver(followUpFormSchema),
    defaultValues: {
      muscleGroup: followUp?.muscleGroup ?? '',
      date: followUp ? new Date(followUp.date).toISOString().split('T')[0] : '',
      notes: followUp?.notes ?? '',
      teacherId: followUp?.teacherId.toString() ?? '',
      studentId: studentId ?? followUp?.studentId.toString(),
    },
  })

  useEffect(() => {
    if (followUp) {
      console.log(followUp)
      reset({
        muscleGroup: followUp.muscleGroup,
        date: new Date(followUp.date).toISOString().split('T')[0],
        notes: followUp.notes,
        teacherId: followUp.teacherId.toString(),
        studentId: followUp.studentId.toString(),
      })
    }
  }, [reset, followUp, studentId, teachers])

  if (!teachers) return null

  return (
    <form
      id="followup-form"
      className="mt-8 space-y-8"
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}
    >
      <input type="hidden" {...register('studentId')} />
      <div className="space-y-4 border rounded-xl p-6 pt-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-1">
            <Label htmlFor="muscleGroup">Grupo muscular *</Label>
            <Input
              id="muscleGroup"
              className="mt-1"
              placeholder="Digite o grupo muscular"
              {...register('muscleGroup')}
            />
            <InputError error={errors.muscleGroup?.message} />
          </div>

          <div className="col-span-3 md:col-span-1">
            <Label htmlFor="teacherId">Professor *</Label>
            <Controller
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers?.map((teacher) => (
                      <SelectItem
                        key={teacher.id}
                        value={teacher.id.toString()}
                      >
                        {teacher.user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <InputError error={errors.teacherId?.message} />
          </div>

          <div className="col-span-3 md:col-span-1">
            <Label htmlFor="date">Data *</Label>
            <Input
              id="date"
              type="date"
              className="mt-1"
              {...register('date')}
            />
            <InputError error={errors.date?.message} />
          </div>

          <div className="col-span-3">
            <Label htmlFor="notes">Observações *</Label>
            <Input
              id="notes"
              className="mt-1"
              placeholder="Digite as observações do acompanhamento"
              {...register('notes')}
            />
            <InputError error={errors.notes?.message} />
          </div>
        </div>
      </div>
    </form>
  )
}
