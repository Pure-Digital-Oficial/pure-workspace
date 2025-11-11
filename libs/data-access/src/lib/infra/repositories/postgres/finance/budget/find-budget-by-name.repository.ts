import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  BudgetResponseDto,
  FindBudgetByNameDto,
  FindBudgetByNameRepository,
} from '@pure-workspace/domain';

export class FindBudgetByNameRepositoryImpl
  implements FindBudgetByNameRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindBudgetByNameDto): Promise<BudgetResponseDto> {
    const { loggedUserId, name } = input;

    const findedBudget = await this.prismaService['budget'].findFirst({
      where: {
        name,
        user_id: loggedUserId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        limit_value: true,
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
      id: findedBudget?.id ?? '',
      name: findedBudget?.name ?? '',
      description: findedBudget?.description ?? '',
      limitValue: findedBudget?.limit_value ?? 0,
      status: findedBudget?.status ?? '',
      createdBy: findedBudget?.user.nickname ?? '',
      createdAt: findedBudget?.created_at ?? new Date(),
      updatedAt: findedBudget?.updated_at ?? new Date(),
    };
  }
}
