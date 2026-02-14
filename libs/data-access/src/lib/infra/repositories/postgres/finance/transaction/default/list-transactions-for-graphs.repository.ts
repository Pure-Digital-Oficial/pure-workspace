import {
  ListTransactionsForGraphsDto,
  ListTransactionsForGraphsRepository,
  ListTransactionsForGraphsResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';
import { Inject } from '@nestjs/common';

interface CategoryTransactionPrismaResponse {
  category_id: string;
  name: string;
  id: string;
  _sum: {
    value: number | null;
  };
}

export class ListTransactionsForGraphsRepositoryImpl
  implements ListTransactionsForGraphsRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async list(
    input: ListTransactionsForGraphsDto
  ): Promise<ListTransactionsForGraphsResponseDto[]> {
    const { finalDate, initialDate, loggedUserId } = input;
    const endFinalDate = new Date(finalDate.getTime() + 24 * 60 * 60 * 1000);

    const groupedTransactions = await this.prismaService['transaction'].groupBy(
      {
        where: {
          user_id: loggedUserId,
          created_at: {
            gte: initialDate,
            lt: endFinalDate,
          },
        },
        by: ['category_id'],
        _sum: {
          value: true,
        },
      }
    );

    const categories = await this.prismaService[
      'category_transaction'
    ].findMany({
      where: {
        id: {
          in: groupedTransactions.map(
            (g: Pick<CategoryTransactionPrismaResponse, 'category_id'>) =>
              g.category_id
          ),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const result: ListTransactionsForGraphsResponseDto[] =
      groupedTransactions.map(
        (
          g: Pick<CategoryTransactionPrismaResponse, 'category_id' | '_sum'>
        ) => ({
          id: g.category_id,
          category:
            categories.find(
              (c: Pick<CategoryTransactionPrismaResponse, 'id'>) =>
                c.id === g.category_id
            )?.name ?? '',
          value: g._sum.value ?? 0,
        })
      );

    return result;
  }
}
