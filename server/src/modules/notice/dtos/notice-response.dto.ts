import { UserDto } from 'src/modules/user/dtos/user.dto';

export class NoticeResponseDto {
  id: number;
  title: string;
  message: string;
  createdAt: Date;
  authorId: number;
  author: UserDto;
}
