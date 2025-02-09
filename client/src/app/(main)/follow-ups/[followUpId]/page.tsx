'use client'

import FollowUpOptions from '@/components/dropdown-menus/followup-options'
import Breadcrumb from '@/components/ui/breadcrumb'
import dayjs from 'dayjs'

import { getFollowUpById } from '@/services/followup-service/followup-service'
import { EnvelopeSimple } from '@phosphor-icons/react'
import { Phone, User } from 'lucide-react'
import { formatField } from '@/utils/format-field'
import { useParams, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Page } from '@/components/layout/page'

export default function FollowUp() {
  const { followUpId } = useParams()
  const searchParams = useSearchParams()
  const from = searchParams.get('from')

  const { data: followUp } = useQuery({
    queryKey: ['followUp', followUpId],
    queryFn: () => getFollowUpById(followUpId as string),
  })

  if (!followUp || !followUp.student || !followUp.teacher) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage={`Acompanhamento do dia ${dayjs.utc(followUp.date).format('DD/MM/YYYY')}`}
          parents={
            from === 'students'
              ? [
                  {
                    name: 'Alunos',
                    path: '/students',
                  },
                  {
                    name: followUp.student.name,
                    path: `/students/${followUp.student.id}`,
                  },
                ]
              : [
                  {
                    name: 'Professores',
                    path: '/teachers',
                  },
                  {
                    name: followUp.teacher?.user.name,
                    path: `/teachers/${followUp.teacherId}`,
                  },
                ]
          }
        />
      </Page.Header>
      <Page.Content>
        <div className="flex justify-between items-center">
          <h2 className="font-bold">
            Acompanhamento {dayjs.utc(followUp.date).format('DD/MM/YYYY')}
          </h2>
          <FollowUpOptions followUp={followUp} variant="primary" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
            <h4 className="font-medium">Aluno</h4>

            <div>
              <div className="flex gap-2 items-center text-sm">
                <User size={20} />
                <span className="text-terciary">
                  {formatField(followUp.student?.name)}
                </span>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <Phone size={20} />
                <span className="text-terciary">
                  {formatField(followUp.student?.phone)}
                </span>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <EnvelopeSimple size={20} />
                <span className="text-terciary">
                  {formatField(followUp.student?.email)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
            <h4 className="font-medium">Professor</h4>

            {followUp.teacher ? (
              <div>
                <div className="flex gap-2 items-center text-sm">
                  <User size={20} />
                  <span className="text-terciary">
                    {formatField(followUp.teacher?.user.name)}
                  </span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <Phone size={20} />
                  <span className="text-terciary">
                    {formatField(followUp.teacher?.phone)}
                  </span>
                </div>
                <div className="flex gap-2 items-center text-sm">
                  <EnvelopeSimple size={20} />
                  <span className="text-terciary">
                    {formatField(followUp.teacher?.email)}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-terciary">Professor não atribuído</span>
              </div>
            )}
          </div>

          <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
            <h4 className="font-medium">Grupo muscular</h4>

            <div>
              <span className="text-sm text-terciary">
                {followUp.muscleGroup}
              </span>
            </div>
          </div>

          <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
            <h4 className="font-medium">Observações</h4>

            <div>
              <span className="text-sm text-terciary">{followUp.notes}</span>
            </div>
          </div>
        </div>
      </Page.Content>
    </Page.Container>
  )
}
