import { IsInt, IsEnum } from 'class-validator';
import { Role } from '../roles.enum';

export class LoginDto {
  @IsInt()
  id: number;

  @IsEnum(Role)
  role: Role;
}

