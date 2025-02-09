import { Injectable } from '@nestjs/common';
import { StudentRepository } from '../repositories/student.repository';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { UpdateStudentDto } from '../dtos/update-student.dto';
import { StudentDto } from '../dtos/student.dto';

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async getAllStudents(): Promise<StudentDto[]> {
    const students = await this.studentRepository.findAll();
    return students.map((student) => ({
      id: student.id,
      name: student.name,
      phone: student.phone,
      email: student.email,
      notes: student.notes,
      teacher: student.teacher,
      anamnesisId: student.anamnesisId,
    }));
  }

  async getStudentById(id: number): Promise<StudentDto> {
    const student = await this.studentRepository.findById(id);
    console.log(student);
    return {
      id: student.id,
      name: student.name,
      phone: student.phone,
      email: student.email,
      notes: student.notes,
      teacher: student.teacher,
      anamnesisId: student.anamnesisId,
    };
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<void> {
    await this.studentRepository.create(createStudentDto);
  }

  async updateStudent(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<void> {
    await this.studentRepository.update(id, updateStudentDto);
  }

  async deleteStudent(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async deleteManyStudents(studentIds: number[]) {
    for (const studentId of studentIds) {
      const existingStudent = await this.studentRepository.findById(studentId);

      if (!existingStudent) {
        throw new Error(`Student with ID ${studentId} not found`);
      }
    }

    await this.studentRepository.deleteMany(studentIds);
  }
}
