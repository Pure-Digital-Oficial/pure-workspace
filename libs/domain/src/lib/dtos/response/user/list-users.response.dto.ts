import { UserResponseDto } from '.';

export interface ListUsersResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  users: UserResponseDto[];
}
