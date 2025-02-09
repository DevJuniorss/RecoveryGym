import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListTeacherDto {
  @ApiPropertyOptional()
  id?: number | undefined;
  @ApiPropertyOptional()
  cpf?: string | undefined;
  @ApiPropertyOptional()
  cref?: string | undefined;
  @ApiPropertyOptional()
  phone?: string | undefined;
  @ApiPropertyOptional()
  email?: string | undefined;
  @ApiPropertyOptional()
  user_name?: string | undefined;
  @ApiPropertyOptional()
  user_username?: string | undefined;
  @ApiPropertyOptional()
  user_password?: string | undefined;
  @ApiPropertyOptional()
  user_role?: string | undefined;
  @ApiPropertyOptional()
  page?: number | undefined;
  @ApiPropertyOptional()
  limit?: number | undefined;
  @ApiPropertyOptional()
  sort?: string | undefined;
  @ApiPropertyOptional()
  order?: OrderDirection | undefined;
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}
