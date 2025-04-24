import { Injectable } from '@nestjs/common';
import { ListUsers, ListUsersDto } from '@pure-workspace/domain';

@Injectable()
export class ListUsersService {
  constructor(private useCase: ListUsers) {}

  async list(input: ListUsersDto) {
    return await this.useCase.execute(input);
  }
}
