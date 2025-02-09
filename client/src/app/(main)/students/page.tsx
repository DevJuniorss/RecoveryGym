'use client'

import Breadcrumb from '@/components/ui/breadcrumb'

import { studentColumns } from './_components/students-columns'
import { getAllStudents } from '@/services/student-service/student-service'
import { StudentsTable } from './_components/students-table'
import { useQuery } from '@tanstack/react-query'
import { Page } from '@/components/layout/page'

export default function Students() {
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: getAllStudents,
  })

  if (!data) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb currentPage="Alunos" />
      </Page.Header>
      <Page.Content>
        <h2 className="font-bold">Alunos</h2>
        <StudentsTable columns={studentColumns} data={data} />
      </Page.Content>
    </Page.Container>
  )
}
