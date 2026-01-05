import { Inject } from '@nestjs/common';
import {
  ListTotalTransactionsDto,
  ListTotalTransactionsRepository,
  TotalTransactionsResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class ListTotalTransactionsRepositoryImpl
  implements ListTotalTransactionsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(
    input: ListTotalTransactionsDto
  ): Promise<TotalTransactionsResponseDto[]> {
    const { finalDate, initialDate, loggedUserId } = input;

    const [deposit, withdraw] = await this.prismaService['$transaction']([
      this.prismaService['transaction'].aggregate({
        _sum: {
          value: true,
        },
        where: {
          initial_date: {
            gte: initialDate,
          },
          final_date: {
            lte: finalDate,
          },
          user_id: loggedUserId,
          status: 'ACTIVE',
          type: 'DEPOSIT',
        },
      }),
      this.prismaService['transaction'].aggregate({
        _sum: {
          value: true,
        },
        where: {
          initial_date: {
            gte: initialDate,
          },
          final_date: {
            lte: finalDate,
          },
          user_id: loggedUserId,
          status: 'ACTIVE',
          type: 'WITHDRAW',
        },
      }),
    ]);

    const balance = (deposit._sum.value || 0) - (withdraw._sum.value || 0);

    return [
      {
        title: 'BALANCE',
        total: balance,
      },
      {
        title: 'DEPOSITS',
        total: deposit._sum.value || 0,
      },
      {
        title: 'WITHDRAWS',
        total: withdraw._sum.value || 0,
      },
    ];
  }
}
