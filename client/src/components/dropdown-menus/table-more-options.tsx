import DeleteManyDialog from '../dialogs/delete-many'

import { AlertDialog, AlertDialogTrigger } from '../shadcn/alert-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { TrashSimple } from '@phosphor-icons/react/dist/ssr'
import { CaretDown } from '@phosphor-icons/react'
import { Teacher } from '@/types/teacher'
import { Button } from '../shadcn/button'
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/shadcn/dropdown-menu'
import { deleteManyTeachers } from '@/services/teacher-service/teacher-service'
import { Student } from '@/types/student'
import { deleteManyStudents } from '@/services/student-service/student-service'

interface TableMoreActionsProps {
  data: Teacher[] | Student[]
  variant: 'teacher' | 'student'
}

export default function TableMoreActions({
  data,
  variant,
}: TableMoreActionsProps) {
  const queryClient = useQueryClient()

  const onDeleteTeachers = async () => {
    const teacherIds = data.map((teacher) => teacher.id)

    await deleteManyTeachers(teacherIds)

    queryClient.invalidateQueries({
      queryKey: ['teachers'],
    })
  }

  const onDeleteStudents = async () => {
    const studentIds = data.map((student) => student.id)

    await deleteManyStudents(studentIds)

    queryClient.invalidateQueries({
      queryKey: ['students'],
    })
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-1 font-normal">
            <span>Mais ações</span>
            <CaretDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-danger" asChild>
            <AlertDialogTrigger
              className="w-full text-danger gap-2"
              onClick={(event) => event.stopPropagation()}
            >
              <TrashSimple size={16} />
              <span>Excluir selecionados ({data.length})</span>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteManyDialog
        onConfirm={variant === 'teacher' ? onDeleteTeachers : onDeleteStudents}
        variant={variant}
        quantity={data.length}
      />
    </AlertDialog>
  )
}
