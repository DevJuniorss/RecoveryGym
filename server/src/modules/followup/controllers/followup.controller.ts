import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FollowUpService } from '../services/followup.service';
import { CreateFollowUpDto } from '../dtos/create-followup.dto';
import { UpdateFollowUpDto } from '../dtos/update-followup.dto';

@Controller('followups')
export class FollowUpController {
  constructor(private readonly followUpService: FollowUpService) {}

  @Get()
  async getAllFollowUps() {
    return await this.followUpService.getAllFollowUps();
  }

  @Get(':id')
  async getFollowUpById(@Param('id') followUpId: string) {
    const id = parseInt(followUpId);
    return await this.followUpService.getFollowUpById(id);
  }

  @Post()
  async createFollowUp(@Body() createFollowUpDto: CreateFollowUpDto) {
    await this.followUpService.createFollowUp(createFollowUpDto);
  }

  @Put(':id')
  async updateFollowUp(
    @Param('id') followUpId: string,
    @Body() updateFollowUpDto: UpdateFollowUpDto,
  ) {
    const id = parseInt(followUpId);
    await this.followUpService.updateFollowUp(id, updateFollowUpDto);
  }

  @Delete(':id')
  async deleteFollowUp(@Param('id') followUpId: string) {
    const id = parseInt(followUpId);
    return await this.followUpService.deleteFollowUp(id);
  }

  @Get('student/:studentId')
  async getFollowUpByStudentId(@Param('studentId') studentId: string) {
    const id = parseInt(studentId);
    return await this.followUpService.getFollowUpByStudentId(id);
  }

  @Get('teacher/:teacherId')
  async getFollowUpByTeacherId(@Param('teacherId') teacherId: string) {
    const id = parseInt(teacherId);
    return await this.followUpService.getFollowUpByTeacherId(id);
  }
}
