import DeleteDialog from '../dialogs/delete-dialog'
import Link from 'next/link'

import { MoreVertical, MoreVerticalIcon } from 'lucide-react'
import { Button } from '../shadcn/button'
import {
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenu,
} from '@/components/shadcn/dropdown-menu'

import { PencilSimple, TrashSimple } from '@phosphor-icons/react/dist/ssr'
import { useQueryClient } from '@tanstack/react-query'
import { AlertDialog } from '../shadcn/alert-dialog'
import { useDialog } from '@/hooks/use-dialog'
import { Notice } from '@/types/notice'
import { deleteNotice } from '@/services/notice-service/notice-service'

interface NoticeOptionsProps {
  notice: Notice
  variant?: 'primary' | 'ghost'
  useLongLabel?: boolean
  showViewItem?: boolean
  showBalanceItem?: boolean
}

export default function NoticeOptions({
  notice,
  variant,
  useLongLabel,
}: NoticeOptionsProps) {
  const queryClient = useQueryClient()
  const deleteDialog = useDialog()

  const onDelete = async () => {
    await deleteNotice(notice.id)

    queryClient.invalidateQueries({
      queryKey: ['get-notice-page'],
    })
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
              <MoreVerticalIcon className="h-4 w-4" />
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
          <DropdownMenuLabel>Ações da notícia</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Edit option */}
          <DropdownMenuItem asChild>
            <Link
              href={`/notice-board/edit/${notice.id}`}
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
            <span>{useLongLabel ? 'Excluir notícia' : 'Excluir'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog {...deleteDialog.props}>
        <DeleteDialog onConfirm={onDelete} variant="notice" />
      </AlertDialog>
    </>
  )
}
