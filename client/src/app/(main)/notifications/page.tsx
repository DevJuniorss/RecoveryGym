import NotificationsGroup from './_components/notifications-group'
import Breadcrumb from '@/components/ui/breadcrumb'
import dayjs from 'dayjs'

import { groupNotificationsByDate } from '@/utils/group-notifications-by-date'
import { notifications } from '@/data/notifications'
import { Page } from '@/components/layout/page'

export default function Notifications() {
  const notificationsGroupedByDate = groupNotificationsByDate(notifications)

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb currentPage="Notificações" />
      </Page.Header>
      <Page.Content>
        <h2 className="font-bold">Notificações</h2>
        <div className="mt-4">
          {notificationsGroupedByDate.map((group) => (
            <div key={group.date}>
              <span>
                {dayjs(group.date).isSame(dayjs(), 'day')
                  ? 'Hoje'
                  : dayjs(group.date).isSame(
                        dayjs().subtract(1, 'day').startOf('day'),
                        'day',
                      )
                    ? 'Ontem'
                    : dayjs(group.date).format('D[ de ]MMMM[ de ]YYYY')}{' '}
              </span>

              {/* Grupo de notificações */}
              <NotificationsGroup notifications={group.notifications} />
            </div>
          ))}
        </div>
      </Page.Content>
    </Page.Container>
  )
}
