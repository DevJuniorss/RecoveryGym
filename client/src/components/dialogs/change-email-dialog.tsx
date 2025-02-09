import { Button } from '@/components/shadcn/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog'
import { ReactNode } from 'react'
import ChangeEmailForm from '../forms/change-email-form'
import { useDialog } from '@/hooks/use-dialog'

interface ChangeEmailDialogProps {
  currentEmail?: string
  children: ReactNode
}

export default function ChangeEmailDialog({
  currentEmail,
  children,
}: ChangeEmailDialogProps) {
  const dialog = useDialog()

  return (
    <Dialog {...dialog.props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar E-mail</DialogTitle>
        </DialogHeader>
        <ChangeEmailForm
          currentEmail={currentEmail}
          onSuccess={dialog.dismiss}
        />
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-warning hover:bg-warning-hover"
            form="change-email-form"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
