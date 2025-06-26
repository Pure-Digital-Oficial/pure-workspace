import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteTriggerDto,
  DeleteTriggerRepository,
} from '@pure-workspace/domain';

export class DeleteTriggerRepositoryImpl implements DeleteTriggerRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteTriggerDto): Promise<string> {
    const updatedTrigger = await this.prismaService['trigger'].update({
      where: {
        id: input.id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return updatedTrigger.id;
  }
}
