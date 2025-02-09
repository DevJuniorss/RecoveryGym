import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { PayloadDto } from '../dtos/payload.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserDto } from 'src/modules/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(userId: number) {
    const user = await this.userRepository.findById(userId);

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
    } as PayloadDto;

    const token = this.jwtService.sign(payload);

    const userDto = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    } as UserDto;

    return {
      user: userDto,
      access_token: token,
    };
  }

  async validate(loginDto: LoginDto): Promise<number> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findByUsername(username);

    if (user && password === user.password) {
      return user.id;
    }
  }
}
