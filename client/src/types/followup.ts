import { Student } from './student'
import { Teacher } from './teacher'

export interface FollowUp {
  id: number
  muscleGroup: string
  date: Date
  notes: string
  studentId: number
  teacherId: number
  teacher?: Teacher
  student?: Student
}
