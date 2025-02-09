'use client'

import Breadcrumb from '@/components/ui/breadcrumb'

import { teacherColumns } from './_components/teachers-columns'
import { DataTable } from './_components/teachers-table'
import { Page } from '@/components/layout/page'
import { useQuery } from '@tanstack/react-query'
import { getAllTeachers } from '@/services/teacher-service/teacher-service'

export default function Teachers() {
  const { data } = useQuery({
    queryKey: ['teachers'],
    queryFn: getAllTeachers,
  })

  if (!data) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb currentPage="Professores" />
      </Page.Header>
      <Page.Content>
        <h2 className="font-bold">Professores</h2>
        <DataTable columns={teacherColumns} data={data} />
      </Page.Content>
    </Page.Container>
  )
}
