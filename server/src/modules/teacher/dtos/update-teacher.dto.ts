import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeacherDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  cpf?: string;

  @ApiProperty()
  cref?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  username?: string;

  @ApiProperty()
  password?: string;
}
