'use client'

import { ArrowUpDown } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Teacher } from '@/types/teacher'
import { Checkbox } from '@/components/shadcn/checkbox'
import { Button } from '@/components/shadcn/button'
import TeacherOptions from '@/components/dropdown-menus/teacher-options'

export const teacherColumns: ColumnDef<Teacher>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(event) => event.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="pl-0"
        >
          Professor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorFn: (row) => row.user?.name,
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return <span className="font-medium">{name}</span>
    },
  },
  {
    accessorKey: 'username',
    header: 'Usuário',
    accessorFn: (row) => row.user?.username,
    cell: ({ row }) => {
      const username = row.getValue('username') as string
      const notExists = !username || username === ''

      return <span className="text-center">{notExists ? '-' : username}</span>
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
  {
    id: 'actions',
    cell: ({ row }) => {
      const teacher = row.original

      return <TeacherOptions teacher={teacher} variant="ghost" showViewItem />
    },
  },
]
