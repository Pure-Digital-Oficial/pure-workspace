import { UserBodyDto } from './user-body.dto';

export interface CreateUserDto {
  appId: string;
  body: Omit<UserBodyDto, 'type' | 'status' | 'id' | 'birthDate'>;
}
