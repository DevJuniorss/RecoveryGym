'use client'

import TeacherForm from '@/components/forms/teacher-form'
import Breadcrumb from '@/components/ui/breadcrumb'

import { useParams, useRouter } from 'next/navigation'
import { TeacherFormData } from '@/types/validations'
import { useQuery } from '@tanstack/react-query'
import { Teacher } from '@/types/teacher'
import { Button } from '@/components/shadcn/button'
import { Page } from '@/components/layout/page'
import {
  getTeacherById,
  updateTeacher,
} from '@/services/teacher-service/teacher-service'

export default function EditTeacher() {
  const router = useRouter()

  const { teacherId } = useParams()

  const { data: teacher } = useQuery<Teacher>({
    queryKey: ['teacher'],
    queryFn: () => getTeacherById(teacherId as string),
  })

  const onSubmit = async (data: TeacherFormData) => {
    await updateTeacher(data, teacherId as string)
    router.back()
  }

  if (!teacher) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Editar"
          parents={[
            {
              name: 'Professores',
              path: '/teachers',
            },
            {
              name: teacher.user.name,
              path: `/teachers/${teacher.id}`,
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Editar professor</h2>
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

        <TeacherForm onSubmit={onSubmit} teacher={teacher} variant="edit" />
      </Page.Content>
    </Page.Container>
  )
}
