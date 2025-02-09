import { Teacher } from '@/types/teacher'
import { Role } from '@/enums/role'

export const teachers: Teacher[] = [
  {
    id: 1,
    cpf: '123.456.789-00',
    cref: '00123-G/SP',
    email: 'joao@gmail.com',
    phone: '88 91234-1234',
    userId: 1,
    user: {
      id: 1,
      role: Role.TEACHER,
      name: 'João Silva',
      username: 'joaozinho',
    },
  },
  {
    id: 2,
    cpf: '987.654.321-11',
    cref: '00456-G/RJ',
    email: 'maria@gmail.com',
    phone: '21 98765-4321',
    userId: 2,
    user: {
      id: 2,
      role: Role.TEACHER,
      name: 'Maria Oliveira',
      username: 'maria.oliveira',
    },
  },
  {
    id: 3,
    cpf: '456.789.123-22',
    cref: '00789-G/MG',
    email: 'carlos@gmail.com',
    phone: '31 91234-5678',
    userId: 3,
    user: {
      id: 3,
      role: Role.TEACHER,
      name: 'Carlos Pereira',
      username: 'carlitos',
    },
  },
  {
    id: 4,
    cpf: '321.654.987-33',
    cref: '00987-G/SP',
    email: 'ana@gmail.com',
    phone: '11 99876-5432',
    userId: 4,
    user: {
      id: 4,
      role: Role.TEACHER,
      name: 'Ana Souza',
      username: 'ana.souza',
    },
  },
  {
    id: 5,
    cpf: '789.123.456-44',
    cref: '00543-G/RS',
    email: 'fernando@gmail.com',
    phone: '51 91111-2222',
    userId: 5,
    user: {
      id: 5,
      role: Role.TEACHER,
      name: 'Fernando Costa',
      username: 'fernandoc',
    },
  },
  {
    id: 6,
    cpf: '789.123.456-44',
    cref: '00543-G/RS',
    email: 'teste@gmail.com',
    phone: '51 91111-2222',
    userId: 5,
    user: {
      id: 5,
      role: Role.TEACHER,
      name: 'Teste Costa',
      username: 'teste',
    },
  },
]
