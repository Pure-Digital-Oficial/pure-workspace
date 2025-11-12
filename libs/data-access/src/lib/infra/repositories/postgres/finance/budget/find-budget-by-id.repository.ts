import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  BudgetResponseDto,
  FindBudgetByIdRepository,
} from '@pure-workspace/domain';

export class FindBudgetByIdRepositoryImpl implements FindBudgetByIdRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<BudgetResponseDto> {
    const findedBudget = await this.prismaService['budget'].findUnique({
      where: {
        id,
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
