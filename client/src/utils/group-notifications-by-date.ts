import { Notification } from '@/types/notification'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const groupNotificationsByDate = (notifications: Notification[]) => {
  const grouped = notifications.reduce<Record<string, Notification[]>>(
    (acc, notification) => {
      const localDate = dayjs(notification.createdAt).local().startOf('day')

      const date = localDate.format('YYYY-MM-DD')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(notification)
      return acc
    },
    {},
  )

  return Object.keys(grouped).map((date) => ({
    date,
    notifications: grouped[date],
  }))
}
