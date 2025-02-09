import ChangeUsernameForm from '../forms/change-username-form'

import { ReactNode } from 'react'
import { useDialog } from '@/hooks/use-dialog'
import { Button } from '@/components/shadcn/button'
import {
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  Dialog,
} from '@/components/shadcn/dialog'

interface ChangeUsernameDialogProps {
  children: ReactNode
  currentUsername: string
}

export default function ChangeUsernameDialog({
  currentUsername,
  children,
}: ChangeUsernameDialogProps) {
  const dialog = useDialog()

  return (
    <Dialog {...dialog.props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar usuário</DialogTitle>
        </DialogHeader>
        <ChangeUsernameForm
          currentUsername={currentUsername}
          onSuccess={dialog.dismiss}
        />
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-warning hover:bg-warning-hover"
            form="change-username-form"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
