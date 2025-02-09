import {
  Controller,
  Delete,
  Param,
  Body,
  Get,
  Post,
  Query,
  Logger,
  Put,
  Patch,
} from '@nestjs/common';
import { UpdateTeacherDto } from '../dtos/update-teacher.dto';
import { TeacherService } from '../services/teacher.service';
import { CreateTeacherDto } from '../dtos/create-teacher.dto';
import { ListTeacherDto } from '../dtos/list-teacher.dto';
import { UpdateEmailDto } from '../dtos/update-email.dto';
import { UpdatePhoneDto } from '../dtos/update-phone.dto';
import { DeleteTeachersDto } from '../dtos/delete-teachers.dto';

@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  async getAllTeachers() {
    return await this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') userId: string) {
    const id = parseInt(userId);

    return await this.teacherService.getTeacherById(id);
  }

  @Get('list')
  async getAllTeachersByFilters(@Query() queryParams: ListTeacherDto) {
    try {
      return await this.teacherService.getAllTeachersByFilters(queryParams);
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  @Post()
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    try {
      await this.teacherService.createTeacher(createTeacherDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateTeacher(
    @Body() updateTeacherDto: UpdateTeacherDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.teacherService.updateTeacher(updateTeacherDto, id);
  }

  @Patch(':id/update-email')
  async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.teacherService.updateEmail(updateEmailDto, id);
  }

  @Patch(':id/update-phone')
  async updatePhone(
    @Body() updatePhoneDto: UpdatePhoneDto,
    @Param('id') userId: string,
  ) {
    const id = parseInt(userId);

    await this.teacherService.updatePhone(updatePhoneDto, id);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id') userId: string) {
    const id = parseInt(userId);

    await this.teacherService.deleteTeacher(id);
  }

  @Delete()
  async deleteTeachers(@Body() deleteTeachersDto: DeleteTeachersDto) {
    const { teacherIds } = deleteTeachersDto;

    return await this.teacherService.deleteManyTeachers(teacherIds);
  }
}
