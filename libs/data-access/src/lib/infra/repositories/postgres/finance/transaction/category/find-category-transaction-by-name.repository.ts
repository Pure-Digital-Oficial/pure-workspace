import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CategoryTransactionBodyDto,
  CategoryTransactionResponseDto,
  FindCategoryTransactionByNameRepository,
} from '@pure-workspace/domain';

export class FindCategoryTransactionByNameRepositoryImpl
  implements FindCategoryTransactionByNameRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}

  async find(
    input: Pick<CategoryTransactionBodyDto, 'name' | 'loggedUserId'>
  ): Promise<CategoryTransactionResponseDto> {
    const { loggedUserId, name } = input;

    const findedCategoryTransaction = await this.prismaService[
      'category_transaction'
    ].findFirst({
      where: {
        name,
        user_id: loggedUserId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return {
      id: findedCategoryTransaction?.id ?? '',
      name: findedCategoryTransaction?.name ?? '',
      description: findedCategoryTransaction?.description ?? '',
      status: findedCategoryTransaction?.status ?? '',
      createdAt: findedCategoryTransaction?.created_at ?? new Date(),
      updatedAt: findedCategoryTransaction?.updated_at ?? new Date(),
      createdBy: findedCategoryTransaction?.user.nickname ?? '',
    };
  }
}
