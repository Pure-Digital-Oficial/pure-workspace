import { AuthResponseDto } from '../auth';

export interface UserResponseDto {
  id: string;
  name: string;
  nickname: string;
  type: string;
  birthDate: Date | null;
  picture: string;
  auth: Omit<AuthResponseDto, 'userId'>;
}
