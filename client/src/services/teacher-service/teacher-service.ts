import { getSession } from '@/app/_actions/auth'
import { Teacher } from '@/types/teacher'
import { api } from '@/lib/axios'
import {
  ChangeEmailFormData,
  ChangePhoneFormData,
  TeacherFormData,
} from '@/types/validations'

export async function getAllTeachers(): Promise<Teacher[]> {
  const response = await api.get('teachers')

  return response.data
}

export async function getTeacherById(
  teacherId: number | string,
): Promise<Teacher> {
  const response = await api.get(`teachers/${teacherId}`)

  return response.data
}

export async function getTeacherBySession(): Promise<Teacher | null> {
  const session = await getSession()

  if (!session) return null

  const response = await api.get(`teachers/${session.user.id}`)
  return response.data
}

export async function createTeacher(data: TeacherFormData): Promise<void> {
  await api.post('teachers', data)
}

export async function updateTeacher(
  data: TeacherFormData,
  teacherId: number | string,
): Promise<void> {
  await api.put(`teachers/${teacherId}`, data)
}

export async function changeEmail(data: ChangeEmailFormData) {
  const session = await getSession()

  if (!session) return null

  await api.patch(`teachers/${session.user.id}/update-email`, data)
}

export async function changePhone(data: ChangePhoneFormData) {
  const session = await getSession()

  if (!session) return null

  await api.patch(`teachers/${session.user.id}/update-phone`, data)
}

export async function deleteTeacher(teacherId: string | number) {
  await api.delete(`teachers/${teacherId}`)
}

export async function deleteManyTeachers(teacherIds: number[]) {
  await api.delete('teachers', {
    data: {
      teacherIds,
    },
  })
}
