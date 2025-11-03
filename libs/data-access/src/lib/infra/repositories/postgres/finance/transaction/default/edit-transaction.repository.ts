import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  EditTransactionDto,
  EditTransactionRepository,
} from '@pure-workspace/domain';

export class EditTransactionRepositoryImpl
  implements EditTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async edit(input: EditTransactionDto): Promise<string> {
    const { categoryId, id, name, type, value, finalDate, initialDate } = input;

    const editedTransaction = await this.prismaService['transaction'].update({
      where: { id },
      data: {
        category_id: categoryId,
        name,
        type,
        value,
        final_date: finalDate,
        initial_date: initialDate,
        updated_at: new Date(),
      },
    });

    return editedTransaction.id ?? '';
  }
}
