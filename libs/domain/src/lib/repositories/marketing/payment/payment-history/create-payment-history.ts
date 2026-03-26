import { CreatePaymentHistoryDto } from '../../../../dtos';

export interface CreatePaymentHistoryRepository {
  create(input: CreatePaymentHistoryDto): Promise<string>;
}
