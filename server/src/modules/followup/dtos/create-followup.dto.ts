import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFollowUpDto {
  @IsNotEmpty()
  @ApiProperty()
  studentId: number;

  @IsNotEmpty()
  @ApiProperty()
  teacherId: number;

  @IsNotEmpty()
  @ApiProperty()
  muscleGroup: string;

  @IsNotEmpty()
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @ApiProperty()
  notes: string;
}
