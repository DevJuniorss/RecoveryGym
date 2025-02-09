import { Button } from '@/components/shadcn/button'
import { Plus } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import Notice from './notice'
import { useQuery } from '@tanstack/react-query'
import { getNoticesPage } from '@/services/notice-service/notice-service'
import { useRouter, useSearchParams } from 'next/navigation'
import { NoticePage } from '@/types/notice-page'
import CustomPagination from '@/components/ui/custom-pagination'

export default function NoticeBoard() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = Number(searchParams.get('page') ?? '1')
  const pageSize = 6

  const { data } = useQuery<NoticePage>({
    queryKey: ['get-notice-page', page],
    queryFn: () => getNoticesPage(page),
  })

  if (!data) return null

  const totalPages = Math.ceil(data.total / Number(pageSize))

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="self-end">
        <Button className="bg-primary hover:bg-primary-hover" asChild>
          <Link href="/notice-board/create">
            <Plus size={24} />
            Cadastrar aviso
          </Link>
        </Button>
      </div>
      {data.total > 0 ? (
        <div>
          <ul className="flex flex-col gap-4">
            {data.notices.map((notice) => (
              <li key={notice.id}>
                <Notice notice={notice} />
              </li>
            ))}
          </ul>

          <CustomPagination
            firstPage={() => router.push('?page=1')}
            lastPage={() => router.push('?page=1')}
            nextPage={() => router.push(`?page=${Number(page) + 1}`)}
            previousPage={() => router.push(`?page=${Number(page) - 1}`)}
            setPageIndex={(p) => router.push(`?page=${p + 1}`)}
            pageIndex={Number(page) - 1}
            totalPages={totalPages}
            canNextPage={Number(page) < totalPages}
            canPreviousPage={Number(page) > 1}
            className="mt-4"
          />
        </div>
      ) : (
        <div className="flex bg-warning bg-opacity-10 text-warning border-warning justify-center space-y-4 border rounded-xl p-6 pt-4">
          <span>Nenhum aviso cadastrado ainda!</span>
        </div>
      )}
    </div>
  )
}
