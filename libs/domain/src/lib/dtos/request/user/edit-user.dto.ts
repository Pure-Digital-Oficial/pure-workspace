import { UserBodyDto } from './user-body.dto';

export interface EditUserDto {
  body: Omit<UserBodyDto, 'type'>;
}
