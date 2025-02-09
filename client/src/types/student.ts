import { Teacher } from './teacher'
import { Anamnesis } from './anamnesis'

export interface Student {
  id: number
  name: string
  email: string | null
  phone: string | null
  notes: string | null
  teacherId: number
  teacher?: Teacher | null
  anamnesis?: Anamnesis | null
}
