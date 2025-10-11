import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateTransactionDto,
  CreateTransactionRepository,
} from '@pure-workspace/domain';

export class CreateTransactionRepositoryImpl
  implements CreateTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateTransactionDto): Promise<string> {
    const {
      categoryId,
      loggedUserId,
      name,
      type,
      value,
      finalDate,
      initialDate,
    } = input;

    const newTransaction = await this.prismaService['transaction'].create({
      data: {
        category_id: categoryId,
        user_id: loggedUserId,
        name,
        status: 'ACTIVE',
        type,
        value,
        final_date: finalDate,
        initial_date: initialDate,
      },
    });

    return newTransaction.id;
  }
}
