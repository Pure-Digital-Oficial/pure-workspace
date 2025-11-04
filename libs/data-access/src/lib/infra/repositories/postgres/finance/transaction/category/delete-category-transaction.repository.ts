import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteCategoryTransactionDto,
  DeleteCategoryTransactionRepository,
} from '@pure-workspace/domain';

export class DeleteCategoryTransactionRepositoryImpl
  implements DeleteCategoryTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async delete(input: DeleteCategoryTransactionDto): Promise<string> {
    const { id } = input;

    const deletedCategoryTransaction = await this.prismaService[
      'category_transaction'
    ].update({
      where: {
        id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return deletedCategoryTransaction.id ?? '';
  }
}
