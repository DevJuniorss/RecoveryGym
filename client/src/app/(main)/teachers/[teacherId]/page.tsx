'use client'

import TabsProvider, { Tab } from '@/components/ui/tab-selector/tabs-context'
import TeacherOptions from '@/components/dropdown-menus/teacher-options'
import Breadcrumb from '@/components/ui/breadcrumb'
import Selectors from '@/components/ui/tab-selector/selectors'
import Content from '@/components/ui/tab-selector/content'

import { Teacher as ITeacher } from '@/types/teacher'
import { getTeacherById } from '@/services/teacher-service/teacher-service'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Page } from '@/components/layout/page'
import {
  IdentificationCard,
  EnvelopeSimple,
  GraduationCap,
  ClipboardText,
  Phone,
} from '@phosphor-icons/react/dist/ssr'
import { FollowUpsTable } from '@/components/tables/followups-table'
import { getFollowUpsByTeacher } from '@/services/followup-service/followup-service'
import { FollowUp } from '@/types/followup'
import { getStudentsByTeacher } from '@/services/student-service/student-service'
import { Student } from '@/types/student'
import { teacherStudentsColumns } from '../../../../components/tables/teacher-students-columns'
import { TeacherStudentsTable } from '../../../../components/tables/teacher-students-table'
import { teacherFollowUpsColumns } from '@/components/tables/teacher-followups-columns'

const tabs: Tab[] = [
  {
    id: 'students',
    label: 'Alunos',
    icon: GraduationCap,
  },
  {
    id: 'follow-ups',
    label: 'Acompanhamentos',
    icon: ClipboardText,
  },
]

export default function Teacher() {
  const { teacherId } = useParams()

  const { data: teacher } = useQuery<ITeacher>({
    queryKey: ['teacher'],
    queryFn: () => getTeacherById(teacherId as string),
  })

  const { data: students } = useQuery<Student[]>({
    queryKey: ['teacher-students'],
    queryFn: () => getStudentsByTeacher(teacherId as string),
  })

  const { data: followUps } = useQuery<FollowUp[]>({
    queryKey: ['teacher-followups'],
    queryFn: () => getFollowUpsByTeacher(teacherId as string),
  })

  if (!teacher) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage={teacher.user.name}
          parents={[
            {
              name: 'Professores',
              path: '/teachers',
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <div className="flex justify-between items-center">
          <h2 className="font-bold">{teacher.user.name}</h2>
          <TeacherOptions teacher={teacher} variant="primary" />
        </div>

        <TabsProvider tabs={tabs}>
          <Selectors />

          <div className="flex">
            <div className="flex py-4 flex-col gap-2 min-w-64">
              <h4 className="text-primary">Detalhes</h4>
              <div className="text-terciary flex flex-col gap-4">
                <div>
                  <div className="flex gap-2 items-center text-sm">
                    <IdentificationCard size={20} />
                    <span>Documentos</span>
                  </div>
                  <ul className="text-xs mt-1">
                    <li>
                      <span>CREF: {teacher.cref ?? 'Não informado'}</span>
                    </li>
                    <li>
                      <span>CPF: {teacher.cpf ?? 'Não informado'}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex gap-2 items-center text-sm">
                    <EnvelopeSimple size={20} />
                    <span>Endereço de e-mail</span>
                  </div>
                  <ul className="text-xs mt-1">
                    <li>
                      <span>{teacher.email ?? 'Não informado'}</span>
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
                      <span>{teacher.phone ?? 'Não informado'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <Content value="students">
                <TeacherStudentsTable
                  columns={teacherStudentsColumns}
                  data={students ?? []}
                />
              </Content>
              <Content value="follow-ups">
                <FollowUpsTable
                  from="teachers"
                  columns={teacherFollowUpsColumns}
                  data={followUps ?? []}
                />
              </Content>
            </div>
          </div>
        </TabsProvider>
      </Page.Content>
    </Page.Container>
  )
}
