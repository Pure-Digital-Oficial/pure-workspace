import {
  CustomerResponseDto,
  FindCustomerByExternalIdRepository,
} from '../../../../index';
import { CustomerMock } from '../../../entities';

export class FindCustomerByExternalIdRepositoryMock
  implements FindCustomerByExternalIdRepository
{
  inputMock = '';
  async find(externalId: string): Promise<CustomerResponseDto> {
    this.inputMock = externalId;
    return CustomerMock;
  }
}
