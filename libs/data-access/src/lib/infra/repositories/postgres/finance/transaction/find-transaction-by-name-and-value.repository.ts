import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindTransactionByNameAndValueDto,
  FindTransactionByNameAndValueRepository,
  TransactionResponseDto,
} from '@pure-workspace/domain';

export class FindTransactionByNameAndValueRepositoryImpl
  implements FindTransactionByNameAndValueRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(
    input: FindTransactionByNameAndValueDto
  ): Promise<TransactionResponseDto> {
    const { loggedUserId, name, value } = input;

    const findedTransaction = await this.prismaService['transaction'].findFirst(
      {
        where: {
          user_id: loggedUserId,
          name,
          value,
        },
        select: {
          id: true,
          category: {
            select: {
              name: true,
            },
          },
          user: {
            select: {
              nickname: true,
            },
          },
          name: true,
          status: true,
          type: true,
          value: true,
          created_at: true,
          updated_at: true,
          final_date: true,
          initial_date: true,
        },
      }
    );

    return {
      id: findedTransaction?.id ?? '',
      category: findedTransaction?.category.name ?? '',
      createdBy: findedTransaction?.user.nickname ?? '',
      name: findedTransaction?.name ?? '',
      status: findedTransaction?.status ?? '',
      type: findedTransaction?.type ?? '',
      value: findedTransaction?.value ?? 0,
      createdAt: findedTransaction?.created_at ?? new Date(),
      updatedAt: findedTransaction?.updated_at ?? new Date(),
      finalDate: findedTransaction?.final_date ?? new Date(),
      initialDate: findedTransaction?.initial_date ?? new Date(),
    };
  }
}
