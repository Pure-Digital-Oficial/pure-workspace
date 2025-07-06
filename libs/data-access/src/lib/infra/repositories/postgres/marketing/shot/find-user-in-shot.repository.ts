import { Inject } from '@nestjs/common';
import {
  FindUserInShotDto,
  FindUserInShotRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class FindUserInShotRepositoryImpl implements FindUserInShotRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindUserInShotDto): Promise<string> {
    const findedShot = await this.prismaService['shot'].findUnique({
      where: {
        id: input.shotId,
        user_id: input.loggedUserId,
      },
    });

    return findedShot?.id ?? '';
  }
}
