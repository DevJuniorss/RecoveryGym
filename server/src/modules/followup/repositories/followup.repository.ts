import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateFollowUpDto } from '../dtos/create-followup.dto';
import { UpdateFollowUpDto } from '../dtos/update-followup.dto';
import { FollowUp } from '@prisma/client';

@Injectable()
export class FollowUpRepository {
  constructor(private prisma: PrismaService) {}

  async create(createFollowUpDto: CreateFollowUpDto): Promise<FollowUp> {
    return this.prisma.followUp.create({
      data: createFollowUpDto,
    });
  }

  async findAll(): Promise<FollowUp[]> {
    return this.prisma.followUp.findMany();
  }

  async findById(followUpId: number): Promise<FollowUp> {
    return this.prisma.followUp.findUnique({
      where: { id: followUpId },
    });
  }

  async update(followUpId: number, updateFollowUpDto: UpdateFollowUpDto) {
    return this.prisma.followUp.update({
      where: { id: followUpId },
      data: updateFollowUpDto,
    });
  }

  async delete(followUpId: number) {
    return this.prisma.followUp.delete({
      where: { id: followUpId },
    });
  }

  async findByStudentId(studentId: number): Promise<FollowUp[]> {
    return this.prisma.followUp.findMany({
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
      },
      where: { studentId },
    });
  }

  async findByTeacherId(teacherId: number): Promise<FollowUp[]> {
    return this.prisma.followUp.findMany({
      include: {
        student: true,
      },
      where: { teacherId },
    });
  }
}
