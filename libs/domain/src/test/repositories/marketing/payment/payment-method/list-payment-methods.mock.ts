import {
  ListPaymentMethodsDto,
  ListPaymentMethodsRepository,
  ListPaymentMethodsResponseDto,
} from '../../../../../index';
import { ListPaymentMethodsMock } from '../../../../entities';

export class ListPaymentMethodsRepositoryMock
  implements ListPaymentMethodsRepository
{
  inputMock = {} as ListPaymentMethodsDto;
  async list(
    input: ListPaymentMethodsDto
  ): Promise<ListPaymentMethodsResponseDto> {
    this.inputMock = input;
    return ListPaymentMethodsMock;
  }
}
