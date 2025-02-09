import { TeacherController } from './controllers/teacher.controller';
import { TeacherRepository } from './repositories/teacher.repository';
import { PrismaService } from 'src/common/services/prisma.service';
import { TeacherService } from './services/teacher.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherRepository, PrismaService],
})
export class TeacherModule {}
