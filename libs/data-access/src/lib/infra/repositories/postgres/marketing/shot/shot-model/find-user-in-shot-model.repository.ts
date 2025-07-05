import { Inject } from '@nestjs/common';
import {
  FindUserInShotModelDto,
  FindUserInShotModelRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class FindUserInShotModelRepositoryImpl
  implements FindUserInShotModelRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindUserInShotModelDto): Promise<string> {
    const findedShotModel = await this.prismaService['shot_model'].findUnique({
      where: {
        id: input.shotModelId,
        user_id: input.loggedUserId,
        status: 'ACTIVE',
      },
    });

    return findedShotModel?.id ?? '';
  }
}
