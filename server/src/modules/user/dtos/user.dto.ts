import { TeacherDto } from 'src/modules/teacher/dtos/teacher.dto';

export class UserDto {
  id: number;
  name: string;
  username: string;
  role: string;
  teacher: TeacherDto | undefined;
}
