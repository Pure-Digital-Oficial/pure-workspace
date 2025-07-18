import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  ChangeShotModelInShotRepository,
  ChangeShotModelInShotDto,
} from '@pure-workspace/domain';

export class ChangeShotModelInShotRepositoryImpl
  implements ChangeShotModelInShotRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async change(input: ChangeShotModelInShotDto): Promise<string> {
    const { modelId, shotId } = input;

    const filteredShotModel = await this.prismaService['shot'].update({
      where: {
        id: shotId,
      },
      data: {
        model_id: modelId,
        updated_at: new Date(),
      },
    });

    return filteredShotModel?.id ?? '';
  }
}
