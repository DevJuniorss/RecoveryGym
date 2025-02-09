import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  teacherId?: number;

  @ApiProperty()
  anaamnesisId?: number;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  notes?: string;
}
