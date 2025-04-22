import { Injectable } from "@nestjs/common";
import { CreateSystemUser, CreateSystemUserDto } from "@pure-workspace/domain";

@Injectable()
export class CreateSystemUserService {
  constructor(private useCase: CreateSystemUser) {}
  async create(input: CreateSystemUserDto) {
    return await this.useCase.execute(input);
  }
}
