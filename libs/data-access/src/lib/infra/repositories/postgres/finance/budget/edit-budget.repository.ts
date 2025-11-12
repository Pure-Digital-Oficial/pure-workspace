import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EditBudgetDto, EditBudgetRepository } from '@pure-workspace/domain';

export class EditBudgetRepositoryImpl implements EditBudgetRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditBudgetDto): Promise<string> {
    const { description, id, limitValue, name } = input;

    const editedBudget = await this.prismaService['budget'].update({
      where: {
        id,
      },
      data: {
        name,
        description,
        limit_value: limitValue,
        updated_at: new Date(),
      },
    });

    return editedBudget?.id ?? '';
  }
}
