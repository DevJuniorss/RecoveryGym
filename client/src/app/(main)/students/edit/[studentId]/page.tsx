'use client'

import StudentForm from '@/components/forms/student-form'
import Breadcrumb from '@/components/ui/breadcrumb'

import { useParams, useRouter } from 'next/navigation'
import { StudentFormData } from '@/types/validations'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/shadcn/button'
import { Page } from '@/components/layout/page'
import {
  getStudentById,
  updateStudent,
} from '@/services/student-service/student-service'

export default function EditStudent() {
  const router = useRouter()
  const { studentId } = useParams()

  const { data: student } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudentById(studentId as string),
  })

  const onSubmit = async (data: StudentFormData) => {
    try {
      await updateStudent(data, studentId as string)
      router.back()
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error)
    }
  }

  if (!student) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Editar"
          parents={[
            {
              name: 'Alunos',
              path: '/students',
            },
            {
              name: student.name,
              path: `/students/${student.id}`,
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Editar aluno</h2>
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

        <StudentForm onSubmit={onSubmit} student={student} />
      </Page.Content>
    </Page.Container>
  )
}
