'use client'

import { usePathname } from 'next/navigation'

import {
  Sidebar as Root,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/shadcn/sidebar'

import {
  Barbell,
  Bell,
  // CalendarDots,
  GraduationCap,
  SquaresFour,
  UsersFour,
} from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import UserSection from './user-section'
import { getUserBySession } from '@/services/user-service/user-service'
import { User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { Role } from '@/enums/role'

interface MenuItem {
  title: string
  url: string
  icon: React.ElementType
  protected?: boolean
}

const items: MenuItem[] = [
  {
    title: 'Início',
    url: '/home',
    icon: SquaresFour,
  },
  {
    title: 'Alunos',
    url: '/students',
    icon: GraduationCap,
  },
  {
    title: 'Professores',
    url: '/teachers',
    icon: UsersFour,
    protected: true,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const unreadNotifications = 1

  const isActive = (item: { url: string }) =>
    item.url === '/'
      ? pathname === item.url
      : pathname === item.url || pathname.startsWith(`${item.url}/`)

  const { data: user } = useQuery<User | null>({
    queryKey: ['profile'],
    queryFn: getUserBySession,
  })

  return (
    <Root collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Barbell weight="fill" className="size-4" />
                </div>
                <h1 className="text-xl font-bold">Socifit</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter(
                  (item) =>
                    !item.protected ||
                    (item.protected && user?.role === Role.ADMINISTRATOR),
                )
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item)}
                      className="data-[active='true']:border-primary data-[active='true']:border"
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sistema</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive({ url: '/notifications' })}
                  className="data-[active='true']:border-primary data-[active='true']:border"
                >
                  <Link href="/notifications">
                    <div className="relative">
                      <Bell />
                      {unreadNotifications > 0 && (
                        <div className="absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-warning" />
                      )}
                    </div>
                    <span>Notificações</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserSection user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Root>
  )
}
