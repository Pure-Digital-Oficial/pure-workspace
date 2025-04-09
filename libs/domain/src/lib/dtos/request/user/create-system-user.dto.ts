import { UserBodyDto } from './user-body.dto';

export interface CreateSystemUserDto {
  appId: string;
  loggedUserId: string;
  loggedUserType: string;
  body: Omit<UserBodyDto, 'type' | 'status' | 'id' | 'birthDate' | 'picture'>;
}
