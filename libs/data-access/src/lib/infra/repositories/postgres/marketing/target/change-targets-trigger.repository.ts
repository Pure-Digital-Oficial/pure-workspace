import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  ChangeTargetTriggerRepository,
  ChangeUniqueTargetTriggerDto,
} from '@pure-workspace/domain';

export class ChangeTargetTriggerRepositoryImpl
  implements ChangeTargetTriggerRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async change(input: ChangeUniqueTargetTriggerDto): Promise<string> {
    const { triggerId, targetId } = input;

    const filteredTarget = await this.prismaService['target_reference'].update({
      where: {
        id: targetId,
      },
      data: {
        trigger_id: triggerId,
        updated_at: new Date(),
      },
    });

    return filteredTarget?.id ?? '';
  }
}
