import { LoginUserDto } from './login.user.dto';

export interface LoginResponseDto {
  user: LoginUserDto;
  access_token: string;
}
