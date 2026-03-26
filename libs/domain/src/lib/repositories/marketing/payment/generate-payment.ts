import {
  GeneratePaymentForRepositoryDto,
  GeneratePaymentResponseDto,
} from '../../../dtos';

export interface GeneratePaymentRepository {
  generate(
    input: GeneratePaymentForRepositoryDto
  ): Promise<GeneratePaymentResponseDto>;
}
