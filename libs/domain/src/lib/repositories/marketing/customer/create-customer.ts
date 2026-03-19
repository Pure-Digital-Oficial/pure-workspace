import { CreateCustomerDto } from '../../../dtos';

export interface CreateCustomerRepository {
  create(input: CreateCustomerDto): Promise<string>;
}
