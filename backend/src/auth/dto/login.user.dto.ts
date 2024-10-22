import { UserRole } from 'src/users/entities/user.entity';

export interface LoginUserDto {
  id: number;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  project?: {
    id: number;
    name: string;
  };
}
