import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteTeachersDto {
  @ApiProperty()
  @IsNotEmpty()
  teacherIds: number[];
}
