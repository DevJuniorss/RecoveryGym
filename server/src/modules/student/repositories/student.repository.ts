import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { Student, Teacher, User } from '@prisma/client';

@Injectable()
export class StudentRepository {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = await this.prisma.student.create({
      data: {
        name: createStudentDto.name,
        phone: createStudentDto.phone,
        email: createStudentDto.email,
        notes: createStudentDto.notes,
        teacherId: createStudentDto.teacherId,
        anamnesis: {
          create: {
            painLocation: createStudentDto.anamnesis.painLocation,
            painStartDate: createStudentDto.anamnesis.painStartDate,
            painOnset: createStudentDto.anamnesis.painOnset,
            painProgression: createStudentDto.anamnesis.painProgression,
            painType: createStudentDto.anamnesis.painType,
            painDuration: createStudentDto.anamnesis.painDuration,
            painRadiation: createStudentDto.anamnesis.painRadiation,
            painIntensity: createStudentDto.anamnesis.painIntensity,
            painActivityLimitation:
              createStudentDto.anamnesis.painActivityLimitation,
            painPeakTime: createStudentDto.anamnesis.painPeakTime,
            painReliefFactors: createStudentDto.anamnesis.painReliefFactors,
            painWorseningFactors:
              createStudentDto.anamnesis.painWorseningFactors,
            painRelatedSymptoms: createStudentDto.anamnesis.painRelatedSymptoms,
          },
        },
      },
      include: {
        anamnesis: true,
      },
    });

    // Update the student with the created anamnesisId
    return this.prisma.student.update({
      where: { id: student.id },
      data: { anamnesisId: student.anamnesis.id },
      include: { anamnesis: true },
    });
  }

  async findAll(): Promise<(Student & { teacher: Teacher })[]> {
    return this.prisma.student.findMany({ include: { teacher: true } });
  }

  async findById(
    studentId: number,
  ): Promise<Student & { teacher: Teacher & { user: User } }> {
    return this.prisma.student.findUnique({
      where: { id: studentId },
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async update(studentId: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id: studentId },
      data: updateStudentDto,
    });
  }

  async delete(studentId: number) {
    return this.prisma.student.delete({
      where: { id: studentId },
      include: {
        teacher: true,
      },
    });
  }

  async deleteMany(studentIds: number[]) {
    return this.prisma.student.deleteMany({
      where: {
        id: {
          in: studentIds,
        },
      },
    });
  }
}
