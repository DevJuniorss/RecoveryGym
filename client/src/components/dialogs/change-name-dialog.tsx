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
import ChangeNameForm from '../forms/change-name-form'
import { useDialog } from '@/hooks/use-dialog'

interface ChangeNameDialogsProps {
  currentName: string
  children: ReactNode
}

export default function ChangeNameDialog({
  currentName,
  children,
}: ChangeNameDialogsProps) {
  const dialog = useDialog()

  return (
    <Dialog {...dialog.props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar nome</DialogTitle>
        </DialogHeader>
        <ChangeNameForm currentName={currentName} onSuccess={dialog.dismiss} />
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-warning hover:bg-warning-hover"
            form="change-name-form"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
