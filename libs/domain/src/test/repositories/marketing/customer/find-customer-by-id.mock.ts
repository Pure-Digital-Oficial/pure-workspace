import { FindCustomerByIdRepository } from '../../../../index';
import { CustomerMock } from '../../../entities';

export class FindCustomerByIdRepositoryMock
  implements FindCustomerByIdRepository
{
  inputMock = '';
  async find(id: string) {
    this.inputMock = id;
    return CustomerMock;
  }
}
