import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EditTriggerDto, EditTriggerRepository } from '@pure-workspace/domain';

export class EditTriggerRepositoryImpl implements EditTriggerRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditTriggerDto): Promise<string> {
    const { id, content, description, name } = input;

    const editedTrigger = await this.prismaService['trigger'].update({
      where: {
        id,
      },
      data: {
        name,
        content,
        description,
        updated_at: new Date(),
      },
    });

    return editedTrigger?.id ?? '';
  }
}
