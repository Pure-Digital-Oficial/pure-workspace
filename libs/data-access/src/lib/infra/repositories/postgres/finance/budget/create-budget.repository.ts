import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateBudgetDto,
  CreateBudgetRepository,
} from '@pure-workspace/domain';

export class CreateBudgetRepositoryImpl implements CreateBudgetRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateBudgetDto): Promise<string> {
    const { description, limitValue, loggedUserId, name } = input;

    const createdBudget = await this.prismaService['budget'].create({
      data: {
        name,
        description,
        limit_value: limitValue,
        user_id: loggedUserId,
      },
    });

    return createdBudget?.id ?? '';
  }
}
