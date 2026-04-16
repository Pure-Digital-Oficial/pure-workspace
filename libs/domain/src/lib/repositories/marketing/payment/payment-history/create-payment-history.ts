import { CreatePaymentHistoryForRepositoryDto } from '../../../../dtos';

export interface CreatePaymentHistoryRepository {
  create(input: CreatePaymentHistoryForRepositoryDto): Promise<string>;
}
