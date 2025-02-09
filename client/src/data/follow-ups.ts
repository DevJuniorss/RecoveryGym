import { FollowUp } from '@/types/followup'
import { teachers } from './teachers'
import { students } from './students'

export const followUps: FollowUp[] = [
  {
    id: 1,
    muscleGroup: 'Chest',
    date: new Date('2025-01-15'),
    notes: 'Focus on improving bench press form and increase weight gradually.',
    student: students.find((student) => student.id === 1),
    teacher: teachers.find((teacher) => teacher.id === 6),
    studentId: 1,
    teacherId: 6,
  },
  {
    id: 2,
    muscleGroup: 'Legs',
    date: new Date('2025-01-18'),
    notes: 'Work on squat depth and ensure proper knee alignment.',
    student: students.find((student) => student.id === 1),
    teacher: teachers.find((teacher) => teacher.id === 1),
    studentId: 1,
    teacherId: 1,
  },
  {
    id: 3,
    muscleGroup: 'Back',
    date: new Date('2025-01-20'),
    notes: 'Introduce deadlift variations to strengthen lower back.',
    student: students.find((student) => student.id === 1),
    teacher: teachers.find((teacher) => teacher.id === 2),
    studentId: 1,
    teacherId: 2,
  },
  {
    id: 4,
    muscleGroup: 'Shoulders',
    date: new Date('2025-01-22'),
    notes: 'Focus on increasing mobility and overhead press strength.',
    student: students.find((student) => student.id === 1),
    teacher: teachers.find((teacher) => teacher.id === 3),
    studentId: 1,
    teacherId: 3,
  },
  {
    id: 5,
    muscleGroup: 'Arms',
    date: new Date('2025-01-25'),
    notes: 'Include supersets for biceps and triceps for hypertrophy.',
    student: students.find((student) => student.id === 1),
    teacher: teachers.find((teacher) => teacher.id === 3),
    studentId: 1,
    teacherId: 3,
  },
]
