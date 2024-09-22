import { LoginDTO } from './dtos/login.dto';
import { SignupDTO } from './dtos/signup.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async login(loginDto: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Incorrect credentials');
    }
    const match = await argon.verify(user.password, loginDto.password);
    if (!match) {
      throw new ForbiddenException('Incorrect credentials');
    }

    delete user.password;
    return user;
  }
  async signup(signupDTO: SignupDTO) {
    const hash = await argon.hash(signupDTO.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: signupDTO.email,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken by another user');
        }
      }
      throw error;
    }
  }
}
