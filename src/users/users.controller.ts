import { UsersService } from './users.service';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GetUser } from '../../src/auth/decorator';
import { JwtGuard } from '../../src/auth/guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  profile(@GetUser() user) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch()
  edit(@GetUser('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }
}
