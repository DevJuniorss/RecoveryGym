'use client'

import FollowUpForm from '@/components/forms/followup-form'
import Breadcrumb from '@/components/ui/breadcrumb'

import { useRouter, useSearchParams } from 'next/navigation'
import { FollowUpFormData } from '@/types/validations'
import { useEffect } from 'react'
import { Button } from '@/components/shadcn/button'
import { Page } from '@/components/layout/page'
import { createFollowUp } from '@/services/followup-service/followup-service'

export default function CreateFollowUp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const studentId = searchParams.get('studentId')

  useEffect(() => {
    if (!studentId) {
      router.push('/students')
    }
  }, [studentId, router])

  const onSubmit = async (data: FollowUpFormData) => {
    await createFollowUp(data)
    router.push(`/students/${studentId}`)
  }

  if (!studentId) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Cadastrar acompanhamento"
          parents={[
            {
              name: 'Alunos',
              path: '/students',
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Cadastrar acompanhamento</h2>
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

        <FollowUpForm onSubmit={onSubmit} studentId={studentId} />
      </Page.Content>
    </Page.Container>
  )
}
