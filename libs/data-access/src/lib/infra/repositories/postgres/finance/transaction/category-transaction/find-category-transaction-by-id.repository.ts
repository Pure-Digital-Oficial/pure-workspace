import { Inject } from '@nestjs/common';
import {
  CategoryTransactionResponseDto,
  FindCategoryTransactionByIdRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class FindCategoryTransactionByIdRepositoryImpl
  implements FindCategoryTransactionByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async find(id: string): Promise<CategoryTransactionResponseDto> {
    const findedCategoryTransaction = await this.prismaService[
      'category_transaction'
    ].findUnique({
      where: {
        id,
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
