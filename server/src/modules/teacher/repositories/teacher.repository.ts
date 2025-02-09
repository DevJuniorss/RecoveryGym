import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma, Teacher, User } from '@prisma/client';
import { Injectable, Logger } from '@nestjs/common';
import { ListTeacherDto } from '../dtos/list-teacher.dto';

@Injectable()
export class TeacherRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.TeacherCreateInput,
  ): Promise<Teacher & { user: User }> {
    return this.prisma.teacher.create({
      data,
      include: {
        user: true,
      },
    });
  }

  async update(
    data: Partial<Teacher> & Partial<User>,
    teacherId: number,
  ): Promise<Teacher & { user: User }> {
    return this.prisma.teacher.update({
      data: {
        cpf: data.cpf,
        email: data.email,
        phone: data.phone,
        cref: data.cref,
        user: {
          update: {
            name: data.name,
            password: data.password,
            username: data.username,
          },
        },
      },
      where: {
        id: teacherId,
      },
      include: {
        user: true,
      },
    });
  }

  async findAll(): Promise<(Teacher & { user: User })[]> {
    return this.prisma.teacher.findMany({
      include: {
        user: true,
      },
      where: {
        id: {
          not: 1,
        },
      },
    });
  }

  async findAllByFilters(
    queryParams: ListTeacherDto,
  ): Promise<(Teacher & { user: User })[]> {
    const skip = queryParams.page
      ? (queryParams.page - 1) * (queryParams.limit ?? 10)
      : 0;
    const take = queryParams.limit ?? 10;

    const where: any = {
      id: queryParams.id ? Number(queryParams.id) : undefined,
      cpf: queryParams.cpf,
      cref: queryParams.cref,
      phone: queryParams.phone,
      email: queryParams.email,
      user: {
        is: {
          id: queryParams.id ? Number(queryParams.id) : undefined,
          name: queryParams.user_name,
          username: queryParams.user_username,
          password: queryParams.user_password,
          role: queryParams.user_role,
        },
      },
    };

    Object.keys(where).forEach(
      (key) => where[key] === undefined && delete where[key],
    );
    Object.keys(where.user.is).forEach(
      (key) => where.user.is[key] === undefined && delete where.user.is[key],
    );

    if (Object.keys(where.user.is).length === 0) {
      delete where.user;
    }

    Logger.log(`Skip: ${skip} Take: ${take} id: ${queryParams.id ?? 'aaa'}`);
    return this.prisma.teacher.findMany({
      skip,
      take,
      where,
      orderBy: {
        [queryParams.sort ?? 'id']: queryParams.order ?? 'asc',
      },
      include: {
        user: true,
      },
    });
  }

  async findById(TeacherId: number): Promise<Teacher & { user: User }> {
    const Teacher = await this.prisma.teacher.findUnique({
      where: {
        id: TeacherId,
      },
      include: {
        user: true,
      },
    });

    if (!Teacher) {
      return null;
    }

    return Teacher;
  }

  async findByTeacherName(
    teacherName: string,
  ): Promise<Teacher & { user: User }> {
    const Teacher = await this.prisma.teacher.findFirst({
      where: {
        user: {
          name: teacherName,
        },
      },
      include: {
        user: true,
      },
    });

    if (!Teacher) {
      return null;
    }

    return Teacher;
  }

  async findByTeacherCpf(
    teacherCpf: string,
  ): Promise<Teacher & { user: User }> {
    const Teacher = await this.prisma.teacher.findFirst({
      where: {
        cpf: teacherCpf,
      },
      include: {
        user: true,
      },
    });

    if (!Teacher) {
      return null;
    }

    return Teacher;
  }

  async deleteById(TeacherId: number): Promise<void> {
    const teacher = await this.prisma.teacher.delete({
      where: {
        id: TeacherId,
      },
    });
    await this.prisma.user.delete({
      where: {
        id: teacher.id,
      },
    });
  }

  async deleteMany(teacherIds: number[]) {
    this.prisma.teacher.deleteMany({
      where: {
        id: {
          in: teacherIds,
        },
      },
    });

    await this.prisma.user.deleteMany({
      where: {
        id: {
          in: teacherIds,
        },
      },
    });
  }
}
