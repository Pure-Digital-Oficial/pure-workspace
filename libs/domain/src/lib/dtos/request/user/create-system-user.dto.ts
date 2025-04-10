import { UserBodyDto } from './user-body.dto';

export interface CreateSystemUserDto {
  appId: string;
  loggedUserId: string;
  body: Omit<UserBodyDto, 'type' | 'status' | 'id' | 'picture' | 'birthDate'>;
}
