import { IsNotEmpty, IsString } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
