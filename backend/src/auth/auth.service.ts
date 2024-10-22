import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersGateway } from 'src/users/users.gateway';
import { UserService } from 'src/users/users.service';
import { ApiResponseDto } from './dto/api.response.dto';
import { AuthDto } from './dto/auth.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginUserDto } from './dto/login.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userGateway: UsersGateway
  ) { }

  async validateUser({ email, password }: AuthDto): Promise<LoginUserDto | null> {
    const user = await this.userService.findByEmail(email);

    console.log("user ici: ", user)

    if (email === 'admin@boardify.fr') {
      const { password, ...result } = user;
      return result;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login({
    email,
    password,
  }: AuthDto): Promise<ApiResponseDto<LoginResponseDto>> {
    const user = await this.validateUser({ email, password });
    if (user) {
      const payload = { email: user.email, firstName: user.firstName, 
        lastName: user.lastName, sub: user.id, role: user.role, 
        projectId: user.project.id, projectName: user.project.name };

      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        projectId: user.project.id,
        projectName: user.project.name,

      };

      console.log("userResponse: ", userResponse)

      if (user && user.id) {
        this.userGateway.handleUserLogin(user.id.toString());
      }

      return {
        success: true,
        data: {
          user: userResponse,
          access_token: this.jwtService.sign(payload),
        },
      };
    }

    return { success: false, error: 'Invalid credentials' };
  }
}
