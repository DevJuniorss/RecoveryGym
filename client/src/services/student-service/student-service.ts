import { StudentFormData } from '@/types/validations'
import { api } from '@/lib/axios'

export async function getAllStudents() {
  const response = await api.get('students')

  return response.data
}

export async function getStudentById(studentId: string) {
  const response = await api.get(`students/${studentId}`)
  return response.data
}

export async function getStudentsByTeacher(teacherId: string | number) {
  console.log('Chamou o get studeents: ', teacherId)
  const response = await api.get(`students/teacher/${teacherId}`)

  return response.data
}

export async function createStudent(studentFormData: StudentFormData) {
  const { teacherId: id, ...data } = studentFormData

  const teacherId = id ? parseInt(id) : null

  const body = {
    teacherId,
    ...data,
  }

  await api.post('students', body)
}

export async function updateStudent(
  studentFormData: StudentFormData,
  studentId: string,
) {
  const { teacherId: id, ...data } = studentFormData

  const teacherId = id ? parseInt(id) : null

  const body = {
    teacherId,
    ...data,
  }

  await api.put(`students/${studentId}`, body)
}

export async function deleteStudent(studentId: string | number) {
  await api.delete(`students/${studentId}`)
}

export async function deleteManyStudents(studentIds: number[]) {
  await api.delete('students', {
    data: {
      studentIds,
    },
  })
}
