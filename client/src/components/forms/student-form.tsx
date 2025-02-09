'use client'

import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../shadcn/input'
import { Label } from '../shadcn/label'
import { StudentFormData } from '@/types/validations'
import { studentFormSchema } from '@/validations/student-form-schema'
import { phoneMask } from '@/utils/phoneMask'
import { Student } from '@/types/student'
import { useQuery } from '@tanstack/react-query'
import { getAllTeachers } from '@/services/teacher-service/teacher-service'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/select'
import InputError from '../ui/input-error'

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void
  student?: Student
}

export default function StudentForm({ onSubmit, student }: StudentFormProps) {
  const { data: teachers } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: student
      ? {
          name: student.name,
          email: student.email,
          phone: student.phone,
          notes: student.notes,
          teacherId: student.teacher?.id?.toString(),
          anamnesis: student.anamnesis ?? undefined,
        }
      : undefined,
  })

  useEffect(() => {
    if (student) {
      reset({
        name: student.name,
        email: student.email,
        phone: student.phone,
        notes: student.notes,
        teacherId: student.teacher?.id.toString(),
        anamnesis: student.anamnesis ?? undefined,
      })
    }
  }, [reset, student, teachers])

  if (!teachers) return null

  return (
    <form
      id="student-form"
      className="mt-8 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4 border rounded-xl p-6 pt-4">
        <h4 className="font-medium">Dados do aluno</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              className="mt-1"
              placeholder="Digite o nome completo"
              {...register('name')}
            />
            <InputError error={errors.name?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              className="mt-1"
              placeholder="Digite apenas números"
              {...register('phone', {
                onChange: phoneMask,
              })}
            />
            <InputError error={errors.phone?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              className="mt-1"
              placeholder="Digite o e-mail"
              {...register('email')}
            />
            <InputError error={errors.email?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="teacherId">Professor</Label>
            <Controller
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ? field.value : undefined}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione o professor" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
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
            <InputError error={errors.teacherId?.message?.toString()} />
          </div>

          <div className="col-span-2">
            <Label htmlFor="notes">Observações</Label>
            <Input
              id="notes"
              className="mt-1"
              placeholder="Digite observações sobre o aluno"
              {...register('notes')}
            />
            <InputError error={errors.notes?.message} />
          </div>
        </div>
      </div>

      <div className="space-y-4 border rounded-xl p-6 pt-4">
        <h4 className="font-medium">Anamnese</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painLocation">Onde dói?</Label>
            <Input
              id="painLocation"
              className="mt-1"
              placeholder="Digite a localização da dor"
              {...register('anamnesis.painLocation')}
            />
            <InputError error={errors.anamnesis?.painLocation?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painStartDate">Quando começou?</Label>
            <Input
              id="painStartDate"
              className="mt-1"
              placeholder="Digite quando começou"
              {...register('anamnesis.painStartDate')}
            />
            <InputError error={errors.anamnesis?.painStartDate?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painOnset">Como começou?</Label>
            <Input
              id="painOnset"
              className="mt-1"
              placeholder="Descreva como a dor começou"
              {...register('anamnesis.painOnset')}
            />
            <InputError error={errors.anamnesis?.painOnset?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painProgression">Como evoluiu?</Label>
            <Input
              id="painProgression"
              className="mt-1"
              placeholder="Descreva a evolução da dor"
              {...register('anamnesis.painProgression')}
            />
            <InputError error={errors.anamnesis?.painProgression?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painType">Qual o tipo da dor?</Label>
            <Input
              id="painType"
              className="mt-1"
              placeholder="Descreva o tipo da dor"
              {...register('anamnesis.painType')}
            />
            <InputError error={errors.anamnesis?.painType?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painDuration">Qual a duração da crise?</Label>
            <Input
              id="painDuration"
              className="mt-1"
              placeholder="Digite a duração da crise"
              {...register('anamnesis.painDuration')}
            />
            <InputError error={errors.anamnesis?.painDuration?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painRadiation">A dor se espalha?</Label>
            <Input
              id="painRadiation"
              className="mt-1"
              placeholder="Descreva se a dor se espalha"
              {...register('anamnesis.painRadiation')}
            />
            <InputError error={errors.anamnesis?.painRadiation?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painIntensity">Qual a intensidade da dor?</Label>
            <Input
              id="painIntensity"
              className="mt-1"
              placeholder="Digite a intensidade (ex: 1-10)"
              {...register('anamnesis.painIntensity')}
            />
            <InputError error={errors.anamnesis?.painIntensity?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painActivityLimitation">
              A dor impede alguma tarefa?
            </Label>
            <Input
              id="painActivityLimitation"
              className="mt-1"
              placeholder="Descreva as limitações"
              {...register('anamnesis.painActivityLimitation')}
            />
            <InputError
              error={errors.anamnesis?.painActivityLimitation?.message}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painPeakTime">
              Em que hora do dia ela é mais forte?
            </Label>
            <Input
              id="painPeakTime"
              className="mt-1"
              placeholder="Digite o horário de pico"
              {...register('anamnesis.painPeakTime')}
            />
            <InputError error={errors.anamnesis?.painPeakTime?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painReliafFactors">O que melhora a dor?</Label>
            <Input
              id="painReliafFactors"
              className="mt-1"
              placeholder="Descreva o que alivia a dor"
              {...register('anamnesis.painReliefFactors')}
            />
            <InputError error={errors.anamnesis?.painReliefFactors?.message} />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painWorseningFactors">O que piora a dor?</Label>
            <Input
              id="painWorseningFactors"
              className="mt-1"
              placeholder="Descreva o que piora a dor"
              {...register('anamnesis.painWorseningFactors')}
            />
            <InputError
              error={errors.anamnesis?.painWorseningFactors?.message}
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="painRelatedSymptoms">Sintomas relacionados</Label>
            <Input
              id="painRelatedSymptoms"
              className="mt-1"
              placeholder="Descreva outros sintomas"
              {...register('anamnesis.painRelatedSymptoms')}
            />
            <InputError
              error={errors.anamnesis?.painRelatedSymptoms?.message}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
