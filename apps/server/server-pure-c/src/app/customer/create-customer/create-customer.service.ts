import { Injectable } from '@nestjs/common';
import { CreateCustomer, CreateCustomerDto } from '@pure-workspace/domain';

@Injectable()
export class CreateCustomerService {
  constructor(private useCase: CreateCustomer) {}

  async create(input: CreateCustomerDto) {
    return await this.useCase.execute(input);
  }
}
