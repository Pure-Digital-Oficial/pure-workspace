import { UserListItem } from '../../../types';

export interface ListUsersResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  users: UserListItem[];
}
