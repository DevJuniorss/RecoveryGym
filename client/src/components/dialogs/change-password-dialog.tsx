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
import ChangePasswordForm from '../forms/change-password-form'
import { useDialog } from '@/hooks/use-dialog'

interface ChangePasswordDialogProps {
  children: ReactNode
}

export default function ChangePasswordDialog(props: ChangePasswordDialogProps) {
  const dialog = useDialog()

  return (
    <Dialog {...dialog.props}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar Senha</DialogTitle>
        </DialogHeader>
        <ChangePasswordForm onSuccess={dialog.dismiss} />
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-warning hover:bg-warning-hover"
            form="change-password-form"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
