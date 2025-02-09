import { DeleteStudentsDto } from '../dtos/delete-students.dto';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentService } from '../services/student.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') studentId: string) {
    const id = parseInt(studentId);
    return await this.studentService.getStudentById(id);
  }

  @Post()
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    console.log(createStudentDto);
    await this.studentService.createStudent(createStudentDto);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    const id = parseInt(studentId);
    await this.studentService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
  async deleteStudent(@Param('id') studentId: string) {
    const id = parseInt(studentId);
    return await this.studentService.deleteStudent(id);
  }

  @Delete()
  async deleteStudents(@Body() deleteStudentsDto: DeleteStudentsDto) {
    const { studentIds } = deleteStudentsDto;

    return await this.studentService.deleteManyStudents(studentIds);
  }
}
