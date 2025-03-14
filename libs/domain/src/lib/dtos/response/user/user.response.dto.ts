import { AuthResponseDto } from '../auth';

export interface UserResponseDto {
  id: string;
  name: string;
  nickname: string;
  type: string;
  birthDate: Date | null;
  auth: Omit<AuthResponseDto, 'password' | 'userId'>[];
}
