import { Inject } from '@nestjs/common';
import {
  DeleteTransactionDto,
  DeleteTransactionRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class DeleteTransactionRepositoryImpl
  implements DeleteTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async delete(input: DeleteTransactionDto): Promise<string> {
    const { id } = input;

    const deletedTransaction = await this.prismaService['transaction'].update({
      where: {
        id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return deletedTransaction.id ?? '';
  }
}
