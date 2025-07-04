import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteShotModelDto,
  DeleteShotModelRepository,
} from '@pure-workspace/domain';

export class DeleteShotModelRepositoryImpl
  implements DeleteShotModelRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteShotModelDto): Promise<string> {
    const updatedShotModel = await this.prismaService['shot_model'].update({
      where: {
        id: input.id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return updatedShotModel.id;
  }
}
