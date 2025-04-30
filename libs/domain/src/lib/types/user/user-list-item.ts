import { UserResponseDto } from '../../dtos';

export type UserListItem = Omit<UserResponseDto, 'auth'> & {
  auth: Omit<UserResponseDto['auth'], 'password'>;
};
