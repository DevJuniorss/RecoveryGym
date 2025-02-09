import { FollowUpFormData } from '@/types/validations'
import { FollowUp } from '@/types/followup'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export async function getAllFollowUps(): Promise<FollowUp[]> {
  const response = await api.get('followups')

  return response.data
}

export async function getFollowUpById(followUpId: string): Promise<FollowUp> {
  const response = await api.get(`followups/${followUpId}`)
  return response.data
}

export async function getFollowUpsByStudent(
  studentId: string | number,
): Promise<FollowUp[]> {
  const response = await api.get(`followups/student/${studentId}`)
  console.log(response.data)
  return response.data
}

export async function getFollowUpsByTeacher(
  teacherId: string | number,
): Promise<FollowUp[]> {
  console.log('Chamou o get followups: ', teacherId)
  const response = await api.get(`followups/teacher/${teacherId}`)

  return response.data
}

export async function createFollowUp(followUpFormData: FollowUpFormData) {
  const { studentId, teacherId, date, ...data } = followUpFormData

  const utcDate = dayjs.utc(date).startOf('day')

  const body = {
    studentId: parseInt(studentId),
    teacherId: parseInt(teacherId),
    date: utcDate,
    ...data,
  }

  await api.post('followups', body)
}

export async function updateFollowUp(
  followUpFormData: FollowUpFormData,
  followUpId: string,
) {
  const { studentId, teacherId, date, ...data } = followUpFormData

  const utcDate = dayjs.utc(date).startOf('day')

  const body = {
    studentId: parseInt(studentId),
    teacherId: parseInt(teacherId),
    date: utcDate,
    ...data,
  }

  await api.put(`followups/${followUpId}`, body)
}

export async function deleteFollowUp(followUpId: string | number) {
  await api.delete(`followups/${followUpId}`)
}
