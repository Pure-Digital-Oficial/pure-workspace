import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  EditCategoryTransactionDto,
  EditCategoryTransactionRepository,
} from '@pure-workspace/domain';
export class EditCategoryTransactionRepositoryImpl
  implements EditCategoryTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditCategoryTransactionDto): Promise<string> {
    const { description, id, name } = input;

    const editedCategoryTransaction = await this.prismaService[
      'category_transaction'
    ].update({
      where: {
        id,
      },
      data: {
        description,
        name,
      },
    });

    return editedCategoryTransaction?.id ?? '';
  }
}
