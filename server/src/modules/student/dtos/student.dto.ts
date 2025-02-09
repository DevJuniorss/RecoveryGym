import { ApiProperty } from '@nestjs/swagger';
import { Anamnesis, Teacher } from '@prisma/client';

export class StudentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  teacherId?: number;

  @ApiProperty()
  teacher?: Teacher;

  @ApiProperty()
  anamnesisId?: number;

  @ApiProperty()
  anamnesis?: Anamnesis;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  notes?: string;
}
