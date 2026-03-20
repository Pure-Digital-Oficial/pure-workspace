import {
  EditCustomerStatusDto,
  EditCustomerStatusRepository,
} from '../../../../index';
import { CustomerMock } from '../../../entities';

export class EditCustomerStatusRepositoryMock
  implements EditCustomerStatusRepository
{
  inputMock = {} as EditCustomerStatusDto;
  async edit(input: EditCustomerStatusDto): Promise<string> {
    this.inputMock = input;
    return CustomerMock.id;
  }
}
