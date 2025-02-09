'use client'

import { useRouter } from 'next/navigation'

import { Page } from '@/components/layout/page'
import Breadcrumb from '@/components/ui/breadcrumb'
import { Button } from '@/components/shadcn/button'
import { createTeacher } from '@/services/teacher-service/teacher-service'
import { TeacherFormData } from '@/types/validations'
import TeacherForm from '@/components/forms/teacher-form'

export default function CreateTeacher() {
  const router = useRouter()

  const onSubmit = async (data: TeacherFormData) => {
    await createTeacher(data)
    router.back()
  }

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Cadastrar professor"
          parents={[
            {
              name: 'Professores',
              path: '/teachers',
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Cadastrar professor</h2>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="teacher-form"
              className="bg-primary hover:bg-primary-hover px-8"
            >
              Salvar
            </Button>
          </div>
        </div>

        <TeacherForm onSubmit={onSubmit} variant="create" />
      </Page.Content>
    </Page.Container>
  )
}
