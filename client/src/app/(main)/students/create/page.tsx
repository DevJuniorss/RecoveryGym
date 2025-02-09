'use client'

import StudentForm from '@/components/forms/student-form'
import Breadcrumb from '@/components/ui/breadcrumb'

import { StudentFormData } from '@/types/validations'
import { createStudent } from '@/services/student-service/student-service'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/shadcn/button'
import { Page } from '@/components/layout/page'

export default function CreateStudent() {
  const router = useRouter()

  const onSubmit = async (data: StudentFormData) => {
    try {
      console.log(data)
      await createStudent(data)
      router.back()
    } catch (error) {
      console.error('Erro ao criar aluno:', error)
    }
  }

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Cadastrar aluno"
          parents={[
            {
              name: 'Alunos',
              path: '/students',
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Cadastrar aluno</h2>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="student-form"
              className="bg-primary hover:bg-primary-hover px-8"
            >
              Salvar
            </Button>
          </div>
        </div>

        <StudentForm onSubmit={onSubmit} />
      </Page.Content>
    </Page.Container>
  )
}
