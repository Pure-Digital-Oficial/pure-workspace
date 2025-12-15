import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  EditBudgetWithCategoryTransactionDto,
  EditBudgetWithCategoryTransactionRepository,
} from '@pure-workspace/domain';

export class EditBudgetWithCategoryTransactionRepositoryImpl
  implements EditBudgetWithCategoryTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditBudgetWithCategoryTransactionDto): Promise<string> {
    const { budgetId, categoryTransactionId } = input;

    const editedBudgetWithCategoryTransaction = await this.prismaService[
      'category_x_budget'
    ].update({
      where: {
        category_id_budget_id: {
          budget_id: budgetId,
          category_id: categoryTransactionId,
        },
      },
      data: {
        ...(input.newBudgetId !== null
          ? {
              budget_id: input.newBudgetId,
            }
          : {}),
        ...(input.newCategoryTransactionId !== null
          ? {
              category_id: input.newCategoryTransactionId,
            }
          : {}),
      },
    });

    return `${editedBudgetWithCategoryTransaction?.budget_id ?? ''}${
      editedBudgetWithCategoryTransaction?.category_id ?? ''
    }`;
  }
}
