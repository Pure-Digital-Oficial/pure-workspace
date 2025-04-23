import { ListUsersDto, ListUsersResponseDto } from '../../dtos';

export interface ListUsersRepository {
  list(input: ListUsersDto): Promise<ListUsersResponseDto>;
}
