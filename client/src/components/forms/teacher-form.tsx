import { teacherFormSchema } from '@/validations/teacher-form-schema'
import { TeacherFormData } from '@/types/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { phoneMask } from '@/utils/phoneMask'
import { crefMask } from '@/utils/crefMask'
import { useForm } from 'react-hook-form'
import { cpfMask } from '@/utils/cpfMask'
import { Teacher } from '@/types/teacher'
import { Input } from '../shadcn/input'
import { Label } from '../shadcn/label'
import InfoPopover from '../ui/info-popover'
import { useEffect, useState } from 'react'
import InputError from '../ui/input-error'

interface TeacherFormProps {
  onSubmit: (data: TeacherFormData) => void
  variant: 'create' | 'edit'
  teacher?: Teacher
}

export default function TeacherForm({
  variant,
  onSubmit,
  teacher,
}: TeacherFormProps) {
  const [resetPassword, setResetPassword] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: teacher?.user.name,
      username: teacher?.user.username,
      cpf: teacher?.cpf,
      cref: teacher?.cref,
      email: teacher?.email,
      phone: teacher?.phone,
    },
  })

  useEffect(() => {
    if (teacher) {
      const initialValues = {
        name: teacher?.user.name,
        username: teacher?.user.username,
        cpf: teacher?.cpf,
        cref: teacher?.cref,
        email: teacher?.email,
        phone: teacher?.phone,
      }

      reset(initialValues)
    }
  }, [reset, teacher])

  return (
    <form
      id="teacher-form"
      className="mt-8 space-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4 border rounded-xl p-6 pt-4">
        <h4 className="font-medium">Dados do professor</h4>
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
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              className="mt-1"
              placeholder="Digite apenas números"
              {...register('cpf', {
                onChange: cpfMask,
              })}
            />
            <InputError error={errors.cpf?.message} />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Label htmlFor="cref">CREF</Label>
            <Input
              id="cref"
              className="mt-1"
              placeholder="Digite o número do CREF"
              {...register('cref', {
                onChange: crefMask,
              })}
            />
            <InputError error={errors.cref?.message} />
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
          <div className="col-span-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              className="mt-1"
              placeholder="Digite o e-mail"
              {...register('email')}
            />
            <InputError error={errors.email?.message} />
          </div>
        </div>
      </div>

      {/* <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl">Horários</h3>
              <Button
                type="button"
                variant="outline"
                onClick={addSchedule}
                className="text-primary"
              >
                Adicionar horário
              </Button>
            </div>

            {schedules.map((_, index) => (
              <div key={index} className="flex items-end gap-4">
                <div className="flex-1">
                  <Label>Horário de entrada</Label>
                  <Input
                    type="time"
                    className="mt-1"
                    {...register(`schedules.${index}.startTime`)}
                  />
                </div>
                <div className="flex-1">
                  <Label>Horário de saída</Label>
                  <Input
                    type="time"
                    className="mt-1"
                    {...register(`schedules.${index}.endTime`)}
                  />
                </div>
                {schedules.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeSchedule(index)}
                    className="text-danger"
                  >
                    <Trash size={20} />
                  </Button>
                )}
              </div>
            ))}
          </div> */}

      <div className="space-y-4 border rounded-xl p-6 pt-4">
        <div className="flex justify-between">
          <h4 className="font-medium">Credenciais de acesso</h4>
          {variant === 'edit' && (
            <button
              type="button"
              className="text-contrast"
              onClick={() => setResetPassword(true)}
            >
              Redefinir senha
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div className="h-5">
              <Label htmlFor="username">Usuário *</Label>
            </div>
            <Input
              id="username"
              className="mt-1"
              placeholder="Digite o nome de usuário"
              {...register('username')}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="password">Senha</Label>
              <InfoPopover text="Se este campo for deixado em branco, a senha padrão será definida automaticamente como: 123" />
            </div>
            <Input
              id="password"
              disabled={!resetPassword && variant === 'edit'}
              type="password"
              className="mt-1"
              placeholder="Digite a senha"
              {...register('password')}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
