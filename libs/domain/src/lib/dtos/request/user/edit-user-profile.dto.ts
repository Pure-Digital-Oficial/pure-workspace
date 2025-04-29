import { UserBodyDto } from '.';

export interface EditUserProfileDto
  extends Omit<UserBodyDto, 'type' | 'nickname' | 'status'> {
  email: string;
  loggedUserId: string;
}
