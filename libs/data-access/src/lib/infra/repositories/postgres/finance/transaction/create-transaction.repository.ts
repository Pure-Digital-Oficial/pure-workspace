import { Inject } from '@nestjs/common';
import {
  CreateTransactionDto,
  CreateTransactionRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class CreateTransactionRepositoryImpl
  implements CreateTransactionRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
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
