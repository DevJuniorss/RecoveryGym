'use client'

import FollowUpOptions from '@/components/dropdown-menus/followup-options'
import dayjs from 'dayjs'

import { ColumnDef } from '@tanstack/react-table'
import { FollowUp } from '@/types/followup'
import { Teacher } from '@/types/teacher'

export const studentFollowUpsColumns: ColumnDef<FollowUp>[] = [
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
    accessorKey: 'teacher',
    header: 'Professor',
    cell: ({ row }) => {
      const teacher = row.getValue('teacher') as Teacher
      return <span>{teacher.user.name}</span>
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
