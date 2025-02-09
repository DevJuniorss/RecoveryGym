import NoticeOptions from '@/components/dropdown-menus/notice-options'
import { Notice as INotice } from '@/types/notice'
import dayjs from 'dayjs'

interface NoticeProps {
  notice: INotice
}

export default function Notice({ notice }: NoticeProps) {
  return (
    <div className="space-y-4 border rounded-xl p-6 pt-4 col-span-2 lg:col-span-1 flex flex-col">
      <div className="flex justify-between gap-2">
        <h4 className="font-medium">{notice.title}</h4>
        <NoticeOptions notice={notice} variant="ghost" />
      </div>

      <span className="text-sm text-terciary">{notice.message}</span>

      <span className="text-xs text-terciary">
        {notice.author.name} ·{' '}
        {dayjs.utc(notice.createdAt).format('DD/MM/YYYY HH:mm')}
      </span>
    </div>
  )
}
