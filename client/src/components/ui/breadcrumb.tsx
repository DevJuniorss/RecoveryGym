import {
  Breadcrumb as Root,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb'
import { Fragment } from 'react'
import { SidebarTrigger } from '../shadcn/sidebar'
import { LineVertical } from '@phosphor-icons/react/dist/ssr'

interface Page {
  name: string
  path: string
}

interface BreadCrumbProps {
  parents?: Page[]
  currentPage: string
}

export default function Breadcrumb({ parents, currentPage }: BreadCrumbProps) {
  return (
    <Root>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>
            <SidebarTrigger />
          </BreadcrumbPage>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <LineVertical />
        </BreadcrumbSeparator>

        {parents?.map((parent, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={parent.path}>{parent.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Root>
  )
}
