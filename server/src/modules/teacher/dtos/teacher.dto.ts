import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/user/dtos/user.dto';
import { User } from '@prisma/client';

export class TeacherDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  cpf: string;
  @ApiProperty()
  cref?: string;
  @ApiProperty()
  phone?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty({ type: UserDto })
  user: User;
}
