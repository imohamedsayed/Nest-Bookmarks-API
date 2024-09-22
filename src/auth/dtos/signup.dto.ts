import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

//   @IsString()
//   readonly firstName: string;

//   @IsString()
//   readonly lastName: string;
}
