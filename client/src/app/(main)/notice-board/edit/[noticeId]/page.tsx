'use client'

import { useParams } from 'next/navigation'

export default function EditNotice() {
  const { noticeId } = useParams()

  return <div>Editar aviso com id {noticeId}</div>
}
