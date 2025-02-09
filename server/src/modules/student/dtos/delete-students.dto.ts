import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteStudentsDto {
  @ApiProperty()
  @IsNotEmpty()
  studentIds: number[];
}
