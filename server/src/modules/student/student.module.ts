import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { StudentRepository } from './repositories/student.repository';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService, StudentRepository],
})
export class StudentModule {}
