import { Injectable } from '@nestjs/common';
import { FollowUpRepository } from '../repositories/followup.repository';
import { CreateFollowUpDto } from '../dtos/create-followup.dto';
import { UpdateFollowUpDto } from '../dtos/update-followup.dto';

@Injectable()
export class FollowUpService {
  constructor(private followUpRepository: FollowUpRepository) {}

  async getAllFollowUps() {
    return await this.followUpRepository.findAll();
  }

  async getFollowUpById(id: number) {
    return await this.followUpRepository.findById(id);
  }

  async createFollowUp(createFollowUpDto: CreateFollowUpDto) {
    await this.followUpRepository.create(createFollowUpDto);
  }

  async updateFollowUp(id: number, updateFollowUpDto: UpdateFollowUpDto) {
    await this.followUpRepository.update(id, updateFollowUpDto);
  }

  async deleteFollowUp(id: number) {
    await this.followUpRepository.delete(id);
  }

  async getFollowUpByStudentId(studentId: number) {
    return await this.followUpRepository.findByStudentId(studentId);
  }

  async getFollowUpByTeacherId(teacherId: number) {
    return await this.followUpRepository.findByTeacherId(teacherId);
  }
}
