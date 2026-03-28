import { ConfirmManualPaymentForRepositoryDto } from '../../../dtos';

export interface ConfirmManualPaymentRepository {
  confirm(input: ConfirmManualPaymentForRepositoryDto): Promise<string>;
}
