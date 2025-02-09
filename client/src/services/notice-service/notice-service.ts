import { NoticePage } from '@/types/notice-page'
import { Notice } from '@/types/notice'
import { api } from '@/lib/axios'

export async function getNoticesPage(
  page: number = 1,
  pageSize: number = 6,
): Promise<NoticePage> {
  const response = await api.get('notices', {
    params: { page, pageSize },
  })

  return response.data
}

export async function getNoticeById(
  noticeId: number | string,
): Promise<Notice> {
  const response = await api.get(`notices/${noticeId}`)

  return response.data
}

// export async function createNotice(data: NoticeFormData): Promise<void> {
//   await api.post('notices', data)
// }

// export async function updateNotice(
//   data: NoticeFormData,
//   noticeId: number | string,
// ): Promise<void> {
//   await api.put(`notices/${noticeId}`, data)
// }

export async function deleteNotice(noticeId: string | number) {
  await api.delete(`notices/${noticeId}`)
}
