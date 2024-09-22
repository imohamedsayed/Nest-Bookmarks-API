import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dtos/login.dto';
import { SignupDTO } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
  @Post('signup')
  async signup(@Body() signupDTO: SignupDTO) {
    return this.authService.signup(signupDTO);
  }
}
