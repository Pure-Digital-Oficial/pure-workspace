import {
  GeneratePaymentForRepositoryDto,
  GeneratePaymentRepository,
  GeneratePaymentResponseDto,
} from '../../../../index';
import { GeneratePaymentMock } from '../../../entities';

export class GeneratePaymentRepositoryMock
  implements GeneratePaymentRepository
{
  inputMock = {} as GeneratePaymentForRepositoryDto;
  async generate(
    input: GeneratePaymentForRepositoryDto
  ): Promise<GeneratePaymentResponseDto> {
    this.inputMock = input;
    return GeneratePaymentMock;
  }
}
