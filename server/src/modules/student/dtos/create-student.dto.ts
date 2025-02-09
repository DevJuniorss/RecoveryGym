import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Anamnesis } from '@prisma/client';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  teacherId?: number;

  @ApiProperty()
  anamnesis?: Anamnesis;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  notes?: string;
}
