import {
  FindShotModelByEntityDto,
  FindShotModelBySubjectRepository,
  ShotModelResponseDto,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class FindShotModelBySubjectRepositoryImpl
  implements FindShotModelBySubjectRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindShotModelByEntityDto): Promise<ShotModelResponseDto> {
    const { entity, loggedUserId, id } = input;

    const filteredShotModel = await this.prismaService['shot_model'].findFirst({
      where: {
        user_id: loggedUserId,
        subject: entity,
      },
      select: {
        id: true,
        title: true,
        body: true,
        status: true,
        subject: true,
        created_at: true,
        updated_at: true,
        image: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    let outputReturn: ShotModelResponseDto = {} as ShotModelResponseDto;

    if (filteredShotModel?.id !== id) {
      outputReturn = {
        id: filteredShotModel?.id ?? '',
        body: filteredShotModel?.body ?? '',
        createdAt: filteredShotModel?.created_at ?? new Date(),
        updatedAt: filteredShotModel?.updated_at ?? new Date(),
        createdBy: filteredShotModel?.user.nickname ?? '',
        status: filteredShotModel?.status ?? '',
        image: filteredShotModel?.image ?? '',
        subject: filteredShotModel?.subject ?? '',
        title: filteredShotModel?.title ?? '',
      };
    }

    return outputReturn;
  }
}
