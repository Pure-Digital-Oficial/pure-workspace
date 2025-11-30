import { Inject } from '@nestjs/common';
import {
  DeleteBudgetWithCategoryTransactionDto,
  DeleteBudgetWithCategoryTransactionRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class DeleteBudgetWithCategoryTransactionRepositoryImpl
  implements DeleteBudgetWithCategoryTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteBudgetWithCategoryTransactionDto): Promise<string> {
    const { budgetId, categoryTransactionId } = input;

    const deletedBudgetWithCategoryTransaction = await this.prismaService[
      'category_x_budget'
    ].delete({
      where: {
        category_id_budget_id: {
          budget_id: budgetId,
          category_id: categoryTransactionId,
        },
      },
    });

    return `${deletedBudgetWithCategoryTransaction?.budget_id ?? ''}${
      deletedBudgetWithCategoryTransaction?.category_id ?? ''
    }`;
  }
}
