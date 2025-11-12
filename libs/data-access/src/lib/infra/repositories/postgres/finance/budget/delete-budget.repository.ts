import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteBudgetDto,
  DeleteBudgetRepository,
} from '@pure-workspace/domain';

export class DeleteBudgetRepositoryImpl implements DeleteBudgetRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteBudgetDto): Promise<string> {
    const { id } = input;

    const deleteBudget = await this.prismaService['budget'].update({
      where: {
        id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });
    return deleteBudget.id ?? '';
  }
}
