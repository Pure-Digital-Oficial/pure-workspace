import { Inject } from '@nestjs/common';
import {
  BudgetWithCategoryTransactionBodyDto,
  FindBudgetWithCategoryTransactionByIdsRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from 'libs/data-access/src/lib/application';

export class FindBudgetWithCategoryTransactionByIdsRepositoryImpl
  implements FindBudgetWithCategoryTransactionByIdsRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(
    input: Omit<BudgetWithCategoryTransactionBodyDto, 'loggedUserId'>
  ): Promise<string> {
    const { budgetId, categoryTransactionId } = input;

    const findedBudgetWithCategoryTransaction = await this.prismaService[
      'category_x_budget'
    ].findUnique({
      where: {
        category_id_budget_id: {
          budget_id: budgetId,
          category_id: categoryTransactionId,
        },
      },
    });

    return `${findedBudgetWithCategoryTransaction?.budget_id ?? ''}${
      findedBudgetWithCategoryTransaction?.category_id ?? ''
    }`;
  }
}
