'use client'

import FollowUpOptions from '@/components/dropdown-menus/followup-options'
import dayjs from 'dayjs'

import { ColumnDef } from '@tanstack/react-table'
import { FollowUp } from '@/types/followup'
import { Student } from '@/types/student'

export const teacherFollowUpsColumns: ColumnDef<FollowUp>[] = [
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row }) => {
      const date = row.getValue('date') as string
      return (
        <span className="font-medium">
          {dayjs.utc(date).format('DD/MM/YYYY')}
        </span>
      )
    },
  },
  {
    accessorKey: 'student',
    header: 'Aluno',
    cell: ({ row }) => {
      const student = row.getValue('student') as Student
      return <span>{student.name}</span>
    },
  },
  {
    accessorKey: 'muscleGroup',
    header: 'Grupo muscular',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const followUp = row.original

      return (
        <FollowUpOptions followUp={followUp} variant="ghost" showViewItem />
      )
    },
  },
]
