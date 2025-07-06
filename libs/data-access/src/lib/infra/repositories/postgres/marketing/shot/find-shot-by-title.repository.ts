import {
  FindShotByEntityDto,
  FindShotByTitleRepository,
  ShotResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class FindShotByTitleRepositoryImpl
  implements FindShotByTitleRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindShotByEntityDto): Promise<ShotResponseDto> {
    const { entity, loggedUserId, id } = input;

    const filteredShot = await this.prismaService['shot'].findFirst({
      where: {
        user_id: loggedUserId,
        title: entity,
      },
      select: {
        id: true,
        title: true,
        scheduled: true,
        status: true,
        model_id: true,
        schedule_date: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    let outputReturn: ShotResponseDto = {} as ShotResponseDto;

    if (filteredShot?.id !== id) {
      outputReturn = {
        id: filteredShot?.id ?? '',
        createdAt: filteredShot?.created_at ?? new Date(),
        updatedAt: filteredShot?.updated_at ?? new Date(),
        createdBy: filteredShot?.user.nickname ?? '',
        status: filteredShot?.status ?? '',
        scheduled: filteredShot?.scheduled ?? false,
        scheduleDate: filteredShot?.schedule_date ?? new Date(),
        title: filteredShot?.title ?? '',
        modelId: filteredShot?.model_id ?? '',
      };
    }

    return outputReturn;
  }
}
