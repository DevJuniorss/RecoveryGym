import { NotificationType } from '@/enums/notification-type'
import { Notification } from '@/types/notification'
import { Role } from '@/enums/role'
import { User } from '@/types/user'

const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)
const twoDaysAgo = new Date()
twoDaysAgo.setDate(today.getDate() - 2)

export const notifications: Notification[] = [
  {
    id: 1,
    recipient: {
      id: 1,
      name: 'Alice',
      username: 'alice',
      role: Role.TEACHER,
    } as User,
    recipientId: 1,
    message: 'Existe uma nova publicação no quadro de avisos!',
    isRead: false,
    type: NotificationType.NOTICE_BOARD_NEW_POST,
    createdAt: today,
  },
  {
    id: 2,
    recipient: {
      id: 2,
      name: 'Bob',
      username: 'bob',
      role: Role.TEACHER,
    } as User,
    recipientId: 2,
    message: 'Existe uma nova publicação no quadro de avisos!',
    isRead: true,
    type: NotificationType.NOTICE_BOARD_NEW_POST,
    createdAt: today,
  },
  {
    id: 3,
    recipient: {
      id: 3,
      name: 'Carol',
      username: 'carol',
      role: Role.TEACHER,
    } as User,
    recipientId: 3,
    message: 'Existe uma nova publicação no quadro de avisos!',
    isRead: true,
    type: NotificationType.NOTICE_BOARD_NEW_POST,
    createdAt: today,
  },
  {
    id: 4,
    recipient: {
      id: 4,
      name: 'Daniel',
      username: 'daniel',
      role: Role.TEACHER,
    } as User,
    recipientId: 4,
    message: 'Novo evento esportivo adicionado ao cronograma!',
    isRead: true,
    type: NotificationType.NOTICE_BOARD_NEW_POST,
    createdAt: yesterday,
  },
  {
    id: 5,
    recipient: {
      id: 5,
      name: 'Eve',
      username: 'eve',
      role: Role.TEACHER,
    } as User,
    recipientId: 5,
    message: 'Seu time avançou para a próxima fase do torneio!',
    isRead: true,
    type: NotificationType.NOTICE_BOARD_NEW_POST,
    createdAt: yesterday,
  },
  {
    id: 6,
    recipient: {
      id: 6,
      name: 'Frank',
      username: 'frank',
      role: Role.TEACHER,
    } as User,
    recipientId: 6,
    message: 'Aula de hoje foi reagendada para outro horário.',
    isRead: true,
    type: NotificationType.NOTICE_BOARD_NEW_POST,
    createdAt: twoDaysAgo,
  },
]
