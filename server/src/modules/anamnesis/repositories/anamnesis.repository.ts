import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateAnamnesisDto } from '../dtos/create-anamnesis.dto';
import { UpdateAnamnesisDto } from '../dtos/update-anamnesis.dto';
import { Anamnesis } from '@prisma/client';

@Injectable()
export class AnamnesisRepository {
  constructor(private prisma: PrismaService) {}

  async create(createAnamnesisDto: CreateAnamnesisDto): Promise<Anamnesis> {
    return this.prisma.anamnesis.create({
      data: {
        painLocation: createAnamnesisDto.painLocation,
        painStartDate: createAnamnesisDto.painStartDate,
        painOnset: createAnamnesisDto.painOnset,
        painProgression: createAnamnesisDto.painProgression,
        painType: createAnamnesisDto.painType,
        painDuration: createAnamnesisDto.painDuration,
        painRadiation: createAnamnesisDto.painRadiation,
        painIntensity: createAnamnesisDto.painIntensity,
        painActivityLimitation: createAnamnesisDto.painActivityLimitation,
        painPeakTime: createAnamnesisDto.painPeakTime,
        painReliefFactors: createAnamnesisDto.painReliefFactors,
        painWorseningFactors: createAnamnesisDto.painWorseningFactors,
        painRelatedSymptoms: createAnamnesisDto.painRelatedSymptoms,
        studentId: createAnamnesisDto.studentId,
      },
    });
  }

  async findAll(): Promise<Anamnesis[]> {
    return this.prisma.anamnesis.findMany();
  }

  async findById(anamnesisId: number): Promise<Anamnesis> {
    return this.prisma.anamnesis.findUnique({
      where: { id: anamnesisId },
    });
  }

  async update(anamnesisId: number, updateAnamnesisDto: UpdateAnamnesisDto) {
    return this.prisma.anamnesis.update({
      where: { id: anamnesisId },
      data: updateAnamnesisDto,
    });
  }

  async delete(anamnesisId: number) {
    return this.prisma.anamnesis.delete({
      where: { id: anamnesisId },
    });
  }
}
