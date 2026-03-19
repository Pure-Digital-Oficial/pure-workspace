import { CreateCustomerDto, CreateCustomerRepository } from '../../../../index';
import { CustomerMock } from '../../../entities';

export class CreateCustomerRepositoryMock implements CreateCustomerRepository {
  inputMock = {} as CreateCustomerDto;
  async create(input: CreateCustomerDto): Promise<string> {
    this.inputMock = input;
    return CustomerMock.id;
  }
}
