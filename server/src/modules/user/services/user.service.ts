import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { UpdateUsernameDto } from '../dtos/update-username.dto';
import { UserRepository } from '../repositories/user.repository';
import { UpdateNameDto } from '../dtos/update-name.dto';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();

    const usersDto = users.map(
      (user) =>
        ({
          id: user.id,
          name: user.name,
          role: user.role,
          username: user.username,
        }) as UserDto,
    );

    return usersDto;
  }

  async getUserById(userId: number): Promise<UserDto> {
    const user = await this.userRepository.findById(userId);

    const userDto: UserDto = {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
      teacher: user.teacher ?? null,
    } as UserDto;

    return userDto;
  }

  async updateName(updateNameDto: UpdateNameDto, userId: number) {
    await this.userRepository.update(
      {
        name: updateNameDto.newName,
      },
      userId,
    );
  }

  async updateUsername(updateUsernameDto: UpdateUsernameDto, userId: number) {
    await this.userRepository.update(
      {
        username: updateUsernameDto.newUsername,
      },
      userId,
    );
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto, userId: number) {
    await this.userRepository.update(
      {
        password: updatePasswordDto.newPassword,
      },
      userId,
    );
  }

  async deleteUser(userId: number) {
    await this.userRepository.deleteById(userId);
  }
}
