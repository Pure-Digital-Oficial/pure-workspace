import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import { CreateShotDto, CreateShotRepository } from '@pure-workspace/domain';

export class CreateShotRepositoryImpl implements CreateShotRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateShotDto): Promise<string> {
    const { loggedUserId, modelId, title, scheduleDate } = input;

    const createdShot = await this.prismaService['shot'].create({
      data: {
        model_id: modelId,
        title,
        created_at: new Date(),
        user_id: loggedUserId,
        ...(scheduleDate
          ? {
              schedule_date: scheduleDate,
              scheduled: true,
            }
          : {
              scheduled: false,
            }),
      },
    });

    return createdShot?.id ?? '';
  }
}
