import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindTransactionByIdRepository,
  TransactionResponseDto,
} from '@pure-workspace/domain';

export class FindTransactionByIdRepositoryImpl
  implements FindTransactionByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async find(id: string): Promise<TransactionResponseDto> {
    const findedTransaction = await this.prismaService[
      'transaction'
    ].findUnique({
      where: { id },
      select: {
        id: true,
        category: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            nickname: true,
            picture: true,
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
    });
    return {
      id: findedTransaction?.id ?? '',
      category: findedTransaction?.category.name ?? '',
      createdBy: {
        id: findedTransaction?.user.id ?? '',
        nickname: findedTransaction?.user.nickname ?? '',
        picture: findedTransaction?.user.picture ?? '',
      },
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
