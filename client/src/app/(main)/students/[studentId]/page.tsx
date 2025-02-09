'use client'

import StudentOptions from '@/components/dropdown-menus/student-options'
import Breadcrumb from '@/components/ui/breadcrumb'

import {
  ClipboardText,
  EnvelopeSimple,
  ListChecks,
  Note,
  Phone,
} from '@phosphor-icons/react/dist/ssr'
import { Student as IStudent } from '@/types/student'
import { getStudentById } from '@/services/student-service/student-service'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { User } from 'lucide-react'
import { Page } from '@/components/layout/page'
import TabsProvider, { Tab } from '@/components/ui/tab-selector/tabs-context'
import Selectors from '@/components/ui/tab-selector/selectors'
import Content from '@/components/ui/tab-selector/content'
import { studentFollowUpsColumns } from './_components/student-followups-columns'
import { FollowUpsTable } from '@/components/tables/followups-table'
import { FollowUp } from '@/types/followup'
import { getFollowUpsByStudent } from '@/services/followup-service/followup-service'
import { formatField } from '@/utils/format-field'

const tabs: Tab[] = [
  {
    id: 'anamnese',
    label: 'Anamnese',
    icon: ListChecks,
  },
  {
    id: 'follow-ups',
    label: 'Acompanhamentos',
    icon: ClipboardText,
  },
]

export default function Student() {
  const { studentId } = useParams()

  const { data: student } = useQuery<IStudent>({
    queryKey: ['student'],
    queryFn: () => getStudentById(studentId as string),
  })

  const { data: followUps } = useQuery<FollowUp[]>({
    queryKey: ['student-followups'],
    queryFn: () => getFollowUpsByStudent(studentId as string),
  })

  if (!student) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage={student.name}
          parents={[
            {
              name: 'Alunos',
              path: '/students',
            },
          ]}
        />
      </Page.Header>

      <Page.Content>
        <div className="flex justify-between items-center">
          <h2 className="font-bold">{student.name}</h2>
          <StudentOptions student={student} variant="primary" />
        </div>

        <TabsProvider tabs={tabs}>
          <Selectors />

          <div className="flex">
            <div className="flex py-4 flex-col gap-2 min-w-64">
              <h4 className="text-primary">Detalhes</h4>
              <div className="text-terciary flex flex-col gap-4">
                <div>
                  <div className="flex gap-2 items-center text-sm">
                    <EnvelopeSimple size={20} />
                    <span>Endereço de e-mail</span>
                  </div>
                  <ul className="text-xs mt-1">
                    <li>
                      <span>{formatField(student.email)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex gap-2 items-center text-sm">
                    <Phone size={20} />
                    <span>Telefone</span>
                  </div>
                  <ul className="text-xs mt-1">
                    <li>
                      <span>{formatField(student.phone)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex gap-2 items-center text-sm">
                    <User size={20} />
                    <span>Professor</span>
                  </div>
                  <ul className="text-xs mt-1">
                    <li>
                      <span>{formatField(student.teacher?.user.name)}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex gap-2 items-center text-sm">
                    <Note size={20} />
                    <span>Observações</span>
                  </div>
                  <ul className="text-xs mt-1 max-w-48">
                    <li>
                      <span>{formatField(student.notes)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <Content value="anamnese">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Onde dói?</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painLocation)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Quando começou?</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painStartDate)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Como começou?</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painOnset)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Como evoluiu?</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painProgression)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Qual o tipo da dor?</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painType)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Qual a duração da crise</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painDuration)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">
                      É uma dor que se espalha ou não?
                    </h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painRadiation)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">Qual a intensidade da dor?</h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painIntensity)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">
                      A dor impede a realização de alguma tarefa?
                    </h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painActivityLimitation)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">
                      Em que hora do dia ela é mais forte?
                    </h4>

                    <span className="text-sm text-terciary">
                      {formatField(student.anamnesis?.painPeakTime)}
                    </span>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">
                      Existe alguma coisa que o sr. faça que a dor melhore?
                    </h4>

                    <div>
                      <span className="text-sm text-terciary">
                        {formatField(student.anamnesis?.painReliefFactors)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">E que piora?</h4>

                    <div>
                      <span className="text-sm text-terciary">
                        {formatField(student.anamnesis?.painWorseningFactors)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1">
                    <h4 className="font-medium">
                      A dor é acompanhada de mais algum sintoma?
                    </h4>

                    <div>
                      <span className="text-sm text-terciary">
                        {formatField(student.anamnesis?.painRelatedSymptoms)}
                      </span>
                    </div>
                  </div>
                </div>
              </Content>
              <Content value="follow-ups">
                <FollowUpsTable
                  from="students"
                  columns={studentFollowUpsColumns}
                  data={followUps ?? []}
                  studentId={student.id.toString()}
                  withButton
                />
              </Content>
            </div>
          </div>
        </TabsProvider>
      </Page.Content>
    </Page.Container>
  )
}
