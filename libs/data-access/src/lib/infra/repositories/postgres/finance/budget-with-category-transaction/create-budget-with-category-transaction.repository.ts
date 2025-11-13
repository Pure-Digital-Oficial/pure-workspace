import { Inject } from '@nestjs/common';
import {
  CreateBudgetWithCategoryTransactionDto,
  CreateBudgetWithCategoryTransactionRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from 'libs/data-access/src/lib/application';

export class CreateBudgetWithCategoryTransactionRepositoryImpl
  implements CreateBudgetWithCategoryTransactionRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async create(input: CreateBudgetWithCategoryTransactionDto): Promise<string> {
    const { budgetId, categoryTransactionId, loggedUserId } = input;
    const createdBudgetWithCategory = await this.prismaService[
      'category_x_budget'
    ].create({
      data: {
        budget_id: budgetId,
        category_id: categoryTransactionId,
        created_by: loggedUserId,
      },
    });

    return `${createdBudgetWithCategory.budget_id}${createdBudgetWithCategory.category_id}`;
  }
}
