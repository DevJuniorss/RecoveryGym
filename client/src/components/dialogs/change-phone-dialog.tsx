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
import ChangePhoneForm from '../forms/change-phone-form'
import { useDialog } from '@/hooks/use-dialog'

interface ChangePhoneDialogProps {
  currentPhone?: string
  children: ReactNode
}

export default function ChangePhoneDialog({
  currentPhone,
  children,
}: ChangePhoneDialogProps) {
  const dialog = useDialog()

  return (
    <Dialog {...dialog.props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar Telefone</DialogTitle>
        </DialogHeader>
        <ChangePhoneForm
          currentPhone={currentPhone}
          onSuccess={dialog.dismiss}
        />
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-warning hover:bg-warning-hover"
            form="change-phone-form"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
