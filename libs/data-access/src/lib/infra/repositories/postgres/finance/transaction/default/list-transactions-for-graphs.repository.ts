import {
  ListTransactionsForGraphsDto,
  ListTransactionsForGraphsRepository,
  ListTransactionsForGraphsResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class ListTransactionsForGraphsRepositoryImpl
  implements ListTransactionsForGraphsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(
    input: ListTransactionsForGraphsDto
  ): Promise<ListTransactionsForGraphsResponseDto[]> {
    const { finalDate, initialDate, loggedUserId } = input;
    const endFinalDate = new Date(finalDate.getTime() + 24 * 60 * 60 * 1000);

    const listedTransactions = await this.prismaService['$queryRaw']<
      ListTransactionsForGraphsResponseDto[]
    >`
        select
            ct.id,
            ct."name" as category,
            sum(
                case
                    when t."type" = 'DEPOSIT' then t.value
                    when t."type" = 'WITHDRAW' then -t.value
                end
            ) as value
        from "pure-finance"."transaction" t
        inner join "pure-finance".category_transaction ct
            on ct.id = t.category_id
        where
            t.user_id = ${loggedUserId}
            and t."status" = 'ACTIVE'
            and t."type" in ('DEPOSIT', 'WITHDRAW')
            and t."created_at" between ${initialDate} and ${endFinalDate}
        group by ct.id, ct."name"
        order by ct."name"
        `;

    return listedTransactions;
  }
}
