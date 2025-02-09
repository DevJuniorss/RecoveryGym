import { User } from './user'

export interface Teacher {
  id: number
  userId: number
  cpf: string
  cref: string
  phone: string
  email: string
  user: User
}
