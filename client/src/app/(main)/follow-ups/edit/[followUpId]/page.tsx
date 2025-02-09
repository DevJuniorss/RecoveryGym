'use client'

import FollowUpForm from '@/components/forms/followup-form'
import Breadcrumb from '@/components/ui/breadcrumb'

import { useParams, useRouter } from 'next/navigation'
import { FollowUpFormData } from '@/types/validations'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/shadcn/button'
import { Page } from '@/components/layout/page'
import {
  getFollowUpById,
  updateFollowUp,
} from '@/services/followup-service/followup-service'

export default function EditFollowUp() {
  const router = useRouter()
  const { followUpId } = useParams()

  const { data: followUp } = useQuery({
    queryKey: ['followUp', followUpId],
    queryFn: () => getFollowUpById(followUpId as string),
  })

  const onSubmit = async (data: FollowUpFormData) => {
    try {
      await updateFollowUp(data, followUpId as string)
      router.back()
    } catch (error) {
      console.error('Erro ao atualizar acompanhamento:', error)
    }
  }

  if (!followUp) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Editar acompanhamento"
          parents={[
            {
              name: 'Alunos',
              path: '/students',
            },
            {
              name: followUp.student?.name ?? '',
              path: `/students/${followUp.student?.id}`,
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Editar acompanhamento</h2>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              form="followup-form"
              className="bg-primary hover:bg-primary-hover px-8"
            >
              Salvar
            </Button>
          </div>
        </div>

        <FollowUpForm onSubmit={onSubmit} followUp={followUp} />
      </Page.Content>
    </Page.Container>
  )
}
