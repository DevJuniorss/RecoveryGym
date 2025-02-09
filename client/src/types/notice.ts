import { User } from './user'

export interface Notice {
  id: number
  title: string
  message: string
  createdAt: Date
  authorId: number
  author: User
}
