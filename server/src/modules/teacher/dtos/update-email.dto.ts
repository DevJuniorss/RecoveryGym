import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  newEmail: string;
}
