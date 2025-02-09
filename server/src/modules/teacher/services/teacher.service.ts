import { UpdateTeacherDto } from '../dtos/update-teacher.dto';
import { TeacherRepository } from '../repositories/teacher.repository';
import { CreateTeacherDto } from '../dtos/create-teacher.dto';
import { Injectable } from '@nestjs/common';
import { TeacherDto } from '../dtos/teacher.dto';
import { ListTeacherDto } from '../dtos/list-teacher.dto';
import { UpdatePhoneDto } from '../dtos/update-phone.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';

@Injectable()
export class TeacherService {
  constructor(private teacherRepository: TeacherRepository) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    if (!createTeacherDto.password) {
      createTeacherDto.password = '123';
    }

    const { name, password, username, ...teacherData } = createTeacherDto;

    await this.teacherRepository.create({
      ...teacherData,
      user: {
        create: {
          name,
          password,
          username,
        },
      },
    });
  }

  async getAllTeachers(): Promise<TeacherDto[]> {
    const teachers = await this.teacherRepository.findAll();
    return teachers.map(
      (teacher) =>
        ({
          id: teacher.id,
          cpf: teacher.cpf,
          cref: teacher.cref,
          email: teacher.email,
          phone: teacher.phone,
          user: {
            id: teacher.user.id,
            name: teacher.user.name,
            role: teacher.user.role,
            username: teacher.user.username,
          },
        }) as TeacherDto,
    );
  }

  async getAllTeachersByFilters(
    queryParams: ListTeacherDto,
  ): Promise<TeacherDto[]> {
    const teachers = await this.teacherRepository.findAllByFilters(queryParams);
    return teachers.map(
      (teacher) =>
        ({
          id: teacher.id,
          cpf: teacher.cpf,
          cref: teacher.cref,
          user: {
            id: teacher.user.id,
            name: teacher.user.name,
            role: teacher.user.role,
            username: teacher.user.username,
          },
        }) as TeacherDto,
    );
  }

  async getTeacherById(teacherId: number): Promise<TeacherDto> {
    const teacher = await this.teacherRepository.findById(teacherId);
    return {
      id: teacher.id,
      cpf: teacher.cpf,
      cref: teacher.cref,
      phone: teacher.phone,
      email: teacher.email,
      user: {
        id: teacher.user.id,
        name: teacher.user.name,
        role: teacher.user.role,
        username: teacher.user.username,
      },
    } as TeacherDto;
  }

  async updateTeacher(updateTeacherDto: UpdateTeacherDto, teacherId: number) {
    const existingUser = this.teacherRepository.findById(teacherId);

    if (!existingUser) {
      throw new Error(`Usuário com id ${teacherId} não encontrado`);
    }

    await this.teacherRepository.update(updateTeacherDto, teacherId);
  }

  async updatePhone(updatePhoneDto: UpdatePhoneDto, teacherId: number) {
    const existingUser = await this.teacherRepository.findById(teacherId);

    if (!existingUser) {
      throw new Error(`Usuário com id ${teacherId} não encontrado`);
    }

    existingUser.phone = updatePhoneDto.newPhone;

    await this.teacherRepository.update(existingUser, teacherId);
  }

  async updateEmail(updateEmailDto: UpdateEmailDto, teacherId: number) {
    const existingUser = await this.teacherRepository.findById(teacherId);

    if (!existingUser) {
      throw new Error(`Usuário com id ${teacherId} não encontrado`);
    }

    existingUser.email = updateEmailDto.newEmail;

    await this.teacherRepository.update(existingUser, teacherId);
  }

  async deleteTeacher(teacherId: number) {
    await this.teacherRepository.deleteById(teacherId);
  }

  async deleteManyTeachers(teacherIds: number[]) {
    for (const teacherId of teacherIds) {
      const existingTeacher = await this.teacherRepository.findById(teacherId);

      if (!existingTeacher) {
        throw new Error(`Teacher with ID ${teacherId} not found`);
      }
    }

    await this.teacherRepository.deleteMany(teacherIds);
  }
}
