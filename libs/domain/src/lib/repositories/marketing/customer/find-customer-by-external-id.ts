import { CustomerResponseDto } from '../../../dtos';

export interface FindCustomerByExternalIdRepository {
  find(externalId: string): Promise<CustomerResponseDto>;
}
