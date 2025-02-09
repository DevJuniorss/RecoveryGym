import DeleteDialog from '../dialogs/delete-dialog'
import Link from 'next/link'

import { MoreHorizontal, MoreVertical } from 'lucide-react'
import { Button } from '../shadcn/button'
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/shadcn/dropdown-menu'

import { PencilSimple, TrashSimple, Eye } from '@phosphor-icons/react/dist/ssr'
import { usePathname, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { AlertDialog } from '../shadcn/alert-dialog'
import { useDialog } from '@/hooks/use-dialog'
import { Student } from '@/types/student'
import { deleteStudent } from '@/services/student-service/student-service'

interface StudentOptionsProps {
  student: Student
  variant?: 'primary' | 'ghost'
  useLongLabel?: boolean
  showViewItem?: boolean
  showBalanceItem?: boolean
}

export default function StudentOptions({
  student,
  variant,
  useLongLabel,
  showViewItem,
}: StudentOptionsProps) {
  const queryClient = useQueryClient()
  const deleteDialog = useDialog()
  const pathname = usePathname()
  const router = useRouter()

  const onDelete = async () => {
    await deleteStudent(student.id)

    if (pathname === `/students/${student.id}`) {
      router.back()
    } else {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      })
    }
  }

  return (
    <>
      {/* Dropdown */}
      <DropdownMenu>
        {/* Trigger */}
        <DropdownMenuTrigger asChild>
          {variant === 'ghost' ? (
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="bg-primary gap-1 hover:bg-primary-hover px-0 w-10"
              onClick={(event) => event.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent align="end" className="min-w-48">
          <DropdownMenuLabel>Ações do aluno</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* View option */}
          {showViewItem && (
            <DropdownMenuItem asChild>
              <Link
                href={`/students/${student.id}`}
                onClick={(event) => event.stopPropagation()}
                className="gap-2"
              >
                <Eye size={16} />
                <span>{useLongLabel ? 'Visualizar aluno' : 'Visualizar'}</span>
              </Link>
            </DropdownMenuItem>
          )}

          {/* Edit option */}
          <DropdownMenuItem asChild>
            <Link
              href={`/students/edit/${student.id}`}
              onClick={(event) => event.stopPropagation()}
              className="gap-2"
            >
              <PencilSimple size={16} />
              <span>{useLongLabel ? 'Editar dados' : 'Editar'}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete option */}
          <DropdownMenuItem
            onClick={(event) => {
              event.stopPropagation()
              deleteDialog.trigger()
            }}
            className="text-danger gap-2"
          >
            <TrashSimple size={16} />
            <span>{useLongLabel ? 'Excluir aluno' : 'Excluir'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog {...deleteDialog.props}>
        <DeleteDialog onConfirm={onDelete} variant="student" />
      </AlertDialog>
    </>
  )
}
