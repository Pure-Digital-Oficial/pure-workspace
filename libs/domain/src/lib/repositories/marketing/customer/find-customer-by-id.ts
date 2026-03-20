import { CustomerResponseDto } from '../../../dtos';

export interface FindCustomerByIdRepository {
  find(id: string): Promise<CustomerResponseDto>;
}
