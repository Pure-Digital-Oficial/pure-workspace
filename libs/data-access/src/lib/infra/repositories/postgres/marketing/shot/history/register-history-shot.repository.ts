import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  RegisterHistoryShotDto,
  RegisterHistoryShotRepository,
} from '@pure-workspace/domain';

export class RegisterHistoryShotRepositoryImpl
  implements RegisterHistoryShotRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async register(input: RegisterHistoryShotDto): Promise<string> {
    const { targetId, shotId } = input;

    const createdHistoryShot = await this.prismaService['history_shot'].create({
      data: {
        target_id: targetId,
        shot_id: shotId,
        created_at: new Date(),
      },
    });

    return createdHistoryShot?.id ?? '';
  }
}
