import { Notice } from '@/types/notice'
import { Role } from '@/enums/role'

export const notices: Notice[] = [
  {
    id: 1,
    title: 'Lembrete de reunião',
    message: 'Lembre-se da reunião amanhã às 10h!',
    createdAt: new Date('2025-02-01T09:00:00Z'),
    authorId: 1,
    author: { id: 1, name: 'João Silva', username: 'joao', role: Role.TEACHER },
  },
  {
    id: 2,
    title: 'Atualização de cronograma',
    message: 'Novo cronograma de aulas disponível.',
    createdAt: new Date('2025-02-01T14:30:00Z'),
    authorId: 2,
    author: {
      id: 2,
      name: 'Maria Oliveira',
      username: 'maria',
      role: Role.TEACHER,
    },
  },
  {
    id: 3,
    title: 'Abertura de inscrições',
    message: 'Inscrições abertas para o torneio de futebol!',
    createdAt: new Date('2025-02-02T08:15:00Z'),
    authorId: 3,
    author: {
      id: 3,
      name: 'Carlos Santos',
      username: 'carlos',
      role: Role.TEACHER,
    },
  },
  {
    id: 4,
    title: 'Cancelamento de aula',
    message: 'Aula de yoga cancelada por motivos de força maior.',
    createdAt: new Date('2025-02-03T10:00:00Z'),
    authorId: 4,
    author: {
      id: 4,
      name: 'Fernanda Lima',
      username: 'fernanda',
      role: Role.TEACHER,
    },
  },
  {
    id: 5,
    title: 'Mudança de horário',
    message: 'Novo aviso sobre a mudança de horário da aula de pilates.',
    createdAt: new Date('2025-02-03T16:00:00Z'),
    authorId: 5,
    author: {
      id: 5,
      name: 'Ricardo Gomes',
      username: 'ricardo',
      role: Role.TEACHER,
    },
  },
  {
    id: 6,
    title: 'Nova turma de natação',
    message: 'Abrimos uma nova turma de natação para iniciantes!',
    createdAt: new Date('2025-02-04T08:00:00Z'),
    authorId: 6,
    author: { id: 6, name: 'Ana Pereira', username: 'ana', role: Role.TEACHER },
  },
  {
    id: 7,
    title: 'Campeonato de basquete',
    message: 'Inscreva-se no campeonato de basquete da academia!',
    createdAt: new Date('2025-02-05T15:30:00Z'),
    authorId: 7,
    author: {
      id: 7,
      name: 'Luiz Fernando',
      username: 'luiz',
      role: Role.TEACHER,
    },
  },
  {
    id: 8,
    title: 'Treino especial',
    message: 'Treino especial com um instrutor convidado!',
    createdAt: new Date('2025-02-06T12:45:00Z'),
    authorId: 8,
    author: {
      id: 8,
      name: 'Sofia Martins',
      username: 'sofia',
      role: Role.TEACHER,
    },
  },
]
