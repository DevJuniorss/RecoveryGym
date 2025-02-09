'use client'

import Breadcrumb from '@/components/ui/breadcrumb'

import { Page } from '@/components/layout/page'
import TabsProvider, { Tab } from '@/components/ui/tab-selector/tabs-context'
import Selectors from '@/components/ui/tab-selector/selectors'
import {
  ClipboardText,
  EnvelopeSimple,
  GraduationCap,
  Newspaper,
  Phone,
} from '@phosphor-icons/react/dist/ssr'
import Content from '@/components/ui/tab-selector/content'
import { getTeacherBySession } from '@/services/teacher-service/teacher-service'
import { Teacher } from '@/types/teacher'
import { useQuery } from '@tanstack/react-query'
import { teacherFollowUpsColumns } from '../../../components/tables/teacher-followups-columns'
import { TeacherStudentsTable } from '../../../components/tables/teacher-students-table'
import { Student } from '@/types/student'
import { FollowUp } from '@/types/followup'
import { getFollowUpsByTeacher } from '@/services/followup-service/followup-service'
import { getStudentsByTeacher } from '@/services/student-service/student-service'
import { teacherStudentsColumns } from '../../../components/tables/teacher-students-columns'
import { FollowUpsTable } from '@/components/tables/followups-table'
import NoticeBoard from './_components/notice-board'

const tabs: Tab[] = [
  {
    id: 'notice-board',
    label: 'Quadro de avisos',
    icon: Newspaper,
  },
  {
    id: 'students',
    label: 'Meus alunos',
    icon: GraduationCap,
  },
  {
    id: 'follow-ups',
    label: 'Meus acompanhamentos',
    icon: ClipboardText,
  },
]

export default function Home() {
  const { data: teacher } = useQuery<Teacher | null>({
    queryKey: ['teacher'],
    queryFn: getTeacherBySession,
  })

  const { data: students } = useQuery<Student[]>({
    queryKey: ['teacher-students'],
    queryFn: () => getStudentsByTeacher(teacher?.id as number),
    enabled: !!teacher?.id,
  })

  const { data: followUps } = useQuery<FollowUp[]>({
    queryKey: ['teacher-followups'],
    queryFn: () => getFollowUpsByTeacher(teacher?.id as number),
    enabled: !!teacher?.id,
  })

  if (!teacher) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb currentPage="Início" />
      </Page.Header>
      <Page.Content>
        <h2 className="font-bold">Bem vindo, {teacher.user.name}!</h2>

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
              <Content value="notice-board">
                <NoticeBoard />
              </Content>
              <Content value="students">
                <TeacherStudentsTable
                  columns={teacherStudentsColumns}
                  data={students ?? []}
                />
              </Content>
              <Content value="follow-ups">
                <FollowUpsTable
                  from="students"
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
