'use client'

import ChangeUsernameDialog from '@/components/dialogs/change-username-dialog'
import ChangePasswordDialog from '@/components/dialogs/change-password-dialog'
import ChangeNameDialog from '@/components/dialogs/change-name-dialog'
import ChangePhoneDialog from '@/components/dialogs/change-phone-dialog'
import ChangeEmailDialog from '@/components/dialogs/change-email-dialog'
import Breadcrumb from '@/components/ui/breadcrumb'
import formatRole from '@/utils/format-role'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'
import { getUserBySession } from '@/services/user-service/user-service'
import { getUserInitials } from '@/utils/get-user-initials'
import { PencilSimple } from '@phosphor-icons/react/dist/ssr'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/shadcn/button'
import { Page } from '@/components/layout/page'

export default function Account() {
  const { data: user } = useQuery({
    queryKey: ['profile', 'settings'],
    queryFn: getUserBySession,
  })

  if (!user) return null

  return (
    <Page.Container>
      <Page.Header>
        <Breadcrumb
          currentPage="Minha conta"
          parents={[
            {
              name: 'Configurações',
              path: '/',
            },
          ]}
        />
      </Page.Header>
      <Page.Content>
        <h2 className="font-bold">Minha conta</h2>

        <div className="flex items-center gap-6 py-8">
          <Avatar className="h-32 w-32 rounded-full">
            <AvatarImage src={undefined} alt="Usuário" />
            <AvatarFallback className="text-3xl rounded-lg">
              {getUserInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-2xl font-medium">{user.name}</h2>
              <ChangeNameDialog currentName={user.name}>
                <Button variant="ghost">
                  <PencilSimple size={24} />
                </Button>
              </ChangeNameDialog>
            </div>
            <span>{formatRole(user.role)}</span>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div>
          <h3 className="font-bold text-xl py-8">Segurança</h3>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Usuário</h4>
              <span className="text-secondary text-sm">{user.username}</span>
            </div>
            <ChangeUsernameDialog currentUsername={user.username}>
              <Button variant="outline">Alterar Usuario</Button>
            </ChangeUsernameDialog>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <h4 className="text-base font-medium">Senha</h4>
              <span className="text-secondary text-sm">
                Troque de senha regularmente
              </span>
            </div>
            <ChangePasswordDialog>
              <Button variant="outline">Alterar Senha</Button>
            </ChangePasswordDialog>
          </div>
        </div>

        <div className="h-px w-full bg-border mt-8" />

        <div>
          <h3 className="font-bold text-xl py-8">Contato</h3>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-medium">Telefone</h4>
              <span className="text-secondary text-sm">
                {user.teacher?.phone ?? 'Não informado'}
              </span>
            </div>
            <ChangePhoneDialog currentPhone={user.teacher?.phone}>
              <Button variant="outline">Alterar Telefone</Button>
            </ChangePhoneDialog>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div>
              <h4 className="text-base font-medium">E-mail</h4>
              <span className="text-secondary text-sm">
                {user.teacher?.email ?? 'Não informado'}
              </span>
            </div>
            <ChangeEmailDialog currentEmail={user.teacher?.email}>
              <Button variant="outline">Alterar E-mail</Button>
            </ChangeEmailDialog>
          </div>
        </div>
      </Page.Content>
    </Page.Container>
  )
}
