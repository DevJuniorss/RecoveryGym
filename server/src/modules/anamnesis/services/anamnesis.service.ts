import { Injectable } from '@nestjs/common';
import { AnamnesisRepository } from '../repositories/anamnesis.repository';
import { CreateAnamnesisDto } from '../dtos/create-anamnesis.dto';
import { UpdateAnamnesisDto } from '../dtos/update-anamnesis.dto';

@Injectable()
export class AnamnesisService {
  constructor(private anamnesisRepository: AnamnesisRepository) {}

  async getAllAnamnesis() {
    return await this.anamnesisRepository.findAll();
  }

  async getAnamnesisById(id: number) {
    return await this.anamnesisRepository.findById(id);
  }

  async createAnamnesis(createAnamnesisDto: CreateAnamnesisDto) {
    await this.anamnesisRepository.create(createAnamnesisDto);
  }

  async updateAnamnesis(id: number, updateAnamnesisDto: UpdateAnamnesisDto) {
    await this.anamnesisRepository.update(id, updateAnamnesisDto);
  }

  async deleteAnamnesis(id: number) {
    await this.anamnesisRepository.delete(id);
  }
}
