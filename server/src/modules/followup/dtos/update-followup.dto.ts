import { ApiProperty } from '@nestjs/swagger';

export class UpdateFollowUpDto {
  @ApiProperty()
  studentId?: number;

  @ApiProperty()
  teacherId?: number;

  @ApiProperty()
  muscleGroup?: string;

  @ApiProperty()
  date?: Date;

  @ApiProperty()
  notes?: string;
}
