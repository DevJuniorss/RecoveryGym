import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma, Teacher, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(data: Partial<User>, userId: number): Promise<User> {
    return await this.prisma.user.update({
      data,
      where: {
        id: userId,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(userId: number): Promise<User & { teacher: Teacher }> {
    const user = await this.prisma.user.findUnique({
      include: {
        teacher: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async deleteById(userId: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
