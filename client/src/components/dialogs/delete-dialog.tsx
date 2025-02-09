import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/shadcn/alert-dialog'

interface DeleteDialogProps {
  onConfirm: () => void
  variant: 'teacher' | 'student' | 'followup' | 'notice'
}

export default function DeleteDialog({
  onConfirm,
  variant,
}: DeleteDialogProps) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {variant === 'teacher'
            ? 'Tem certeza que deseja excluir este professor?'
            : variant === 'student'
              ? 'Tem certeza que deseja excluir este aluno?'
              : variant === 'followup'
                ? 'Tem certeza que deseja excluir este acompanhamento?'
                : 'Tem certeza que deseja excluir este aviso?'}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {variant === 'teacher'
            ? 'Esta ação não pode ser desfeita. Isso vai excluir o professor permanentemente.'
            : variant === 'student'
              ? 'Esta ação não pode ser desfeita. Isso vai excluir o aluno permanentemente.'
              : variant === 'followup'
                ? 'Esta ação não pode ser desfeita. Isso vai excluir o acompanhamento permanentemente.'
                : 'Esta ação não pode ser desfeita. Isso vai excluir o aviso permanentemente.'}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={(event) => event.stopPropagation()}>
          Cancelar
        </AlertDialogCancel>
        <AlertDialogAction
          className="bg-danger hover:bg-danger-hover"
          onClick={(event) => {
            event.stopPropagation()
            onConfirm()
          }}
        >
          Sim, excluir
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
