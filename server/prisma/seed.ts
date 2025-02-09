import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating admin user...');
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Administrador',
      username: 'admin',
      password: '123',
      role: 'ADMINISTRATOR',
      teacher: {
        create: {
          email: 'adm@email.com',
          phone: '999999999',
          cpf: '99999999999',
          cref: '999999999',
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
