import { NotificationType } from '@/enums/notification-type'
import { User } from './user'

export interface Notification {
  id: number
  recipient: User
  recipientId: number
  message: string
  isRead?: boolean
  type: NotificationType
  createdAt: Date
}
