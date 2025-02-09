'use client'

import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/shadcn/button'
import { Student } from '@/types/student'

export const teacherStudentsColumns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-0"
        >
          Alunos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (row) => row.name,
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return <span className="font-medium">{name}</span>
    },
  },
  {
    accessorKey: 'phone',
    header: 'Telefone',
    cell: ({ row }) => {
      const phone = row.getValue('phone') as string
      const notExists = !phone || phone === ''

      return <span className="text-center">{notExists ? '-' : phone}</span>
    },
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ row }) => {
      const email = row.getValue('email') as string
      const notExists = !email || email === ''

      return <span className="text-center">{notExists ? '-' : email}</span>
    },
  },
]
