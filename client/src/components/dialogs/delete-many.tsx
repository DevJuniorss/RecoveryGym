import {
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/shadcn/alert-dialog'

interface DeleteManyDialogProps {
  onConfirm: () => void
  quantity: number
  variant: 'teacher' | 'student'
}

export default function DeleteManyDialog({
  onConfirm,
  quantity,
  variant,
}: DeleteManyDialogProps) {
  if (!quantity) {
    return (
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nenhuma seleção encontrada</AlertDialogTitle>
          <AlertDialogDescription>
            Para prosseguir com a exclusão, selecione ao menos uma linha na
            tabela. Selecione os itens desejados e tente novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="bg-warning hover:bg-warning-hover"
            onClick={(event) => event.stopPropagation()}
          >
            Voltar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    )
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {variant === 'teacher'
            ? `Confirmar exclusão de ${quantity} professor(es)?`
            : `Confirmar exclusão de ${quantity} aluno(s)?`}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {variant === 'teacher'
            ? 'Esta ação não poderá ser desfeita. Isso irá excluir os professores permanentemente.'
            : 'Esta ação não poderá ser desfeita. Isso irá excluir os alunos permanentemente.'}
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
