import { Role } from '@/enums/role'

export interface User {
  id: number
  name: string
  role: Role
  username: string
  teacher?: {
    id: number
    cpf: string
    cref: string
    phone: string
    email: string
  }
}
