import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  CreateCategoryTransactionDto,
  CreateCategoryTransactionRepository,
} from '@pure-workspace/domain';

export class CreateCategoryTransactionRepositoryImpl
  implements CreateCategoryTransactionRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async create(input: CreateCategoryTransactionDto): Promise<string> {
    const { description, loggedUserId, name } = input;

    const createdCategoryTransaction = await this.prismaService[
      'category_transaction'
    ].create({
      data: {
        description,
        name,
        user_id: loggedUserId,
      },
    });

    return createdCategoryTransaction.id ?? '';
  }
}
