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
    const endFinalDate = new Date(finalDate.getTime() + 24 * 60 * 60 * 1000);

    const whereClause = {
      created_at: {
        gte: initialDate,
        lt: endFinalDate,
      },
      user_id: loggedUserId,
      status: 'ACTIVE' as const,
    };

    const [deposits, withdraws] = await this.prismaService['$transaction']([
      this.prismaService['transaction'].aggregate({
        _sum: {
          value: true,
        },
        where: {
          ...whereClause,
          type: 'DEPOSIT',
        },
      }),
      this.prismaService['transaction'].aggregate({
        _sum: {
          value: true,
        },
        where: {
          ...whereClause,
          type: 'WITHDRAW',
        },
      }),
    ]);

    const balance = (deposits._sum.value || 0) - (withdraws._sum.value || 0);

    return [
      {
        title: 'BALANCE',
        total: balance,
      },
      {
        title: 'DEPOSITS',
        total: deposits._sum.value || 0,
      },
      {
        title: 'WITHDRAWS',
        total: withdraws._sum.value || 0,
      },
    ];
  }
}
