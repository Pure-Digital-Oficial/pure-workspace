import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteTargetDto,
  DeleteTargetRepository,
} from '@pure-workspace/domain';

export class DeleteTargetRepositoryImpl implements DeleteTargetRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteTargetDto): Promise<string> {
    const updatedTarget = await this.prismaService['target_reference'].update({
      where: {
        id: input.id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return updatedTarget.id;
  }
}
