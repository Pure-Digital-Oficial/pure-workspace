import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EditTargetDto, EditTargetRepository } from '@pure-workspace/domain';

export class EditTargetRepositoryImpl implements EditTargetRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditTargetDto): Promise<string> {
    const { id, content, triggerId } = input;

    const editedTarget = await this.prismaService['target_reference'].update({
      where: {
        id,
      },
      data: {
        content,
        trigger_id: triggerId,
        updated_at: new Date(),
      },
    });

    return editedTarget?.id ?? '';
  }
}
