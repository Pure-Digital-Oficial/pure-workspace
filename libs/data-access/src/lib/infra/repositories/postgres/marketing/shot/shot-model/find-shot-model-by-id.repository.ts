import { Inject } from '@nestjs/common';
import {
  FindShotModelByIdRepository,
  ShotModelResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../../application';

export class FindShotModelByIdRepositoryImpl
  implements FindShotModelByIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<ShotModelResponseDto> {
    const filteredShotModel = await this.prismaService['shot_model'].findFirst({
      where: {
        id,
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

    return {
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
}
