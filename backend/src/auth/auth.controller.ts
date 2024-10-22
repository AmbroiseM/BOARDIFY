import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponseDto } from './dto/login.response.dto';
import { ApiResponseDto } from './dto/api.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body() { email, password }: AuthDto,
  ): Promise<ApiResponseDto<LoginResponseDto>> {
    return await this.authService.login({ email, password });
  }
}
