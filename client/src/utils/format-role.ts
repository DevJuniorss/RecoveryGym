import { Role } from '@/enums/role'

export default function formatRole(role: Role) {
  switch (role) {
    case Role.ADMINISTRATOR:
      return 'Administrador'
    case Role.TEACHER:
      return 'Professor'
    default:
      return 'Papel não identificado'
  }
}
