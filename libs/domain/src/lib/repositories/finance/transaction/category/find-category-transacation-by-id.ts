import { CategoryTransactionResponseDto } from '../../../../dtos';

export interface FindCategoryTransactionByIdRepository {
  find(id: string): Promise<CategoryTransactionResponseDto>;
}
