import { Inject } from '@nestjs/common';
import {
  FindUserInTargetDto,
  FindUserInTargetRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class FindUserInTargetRepositoryImpl
  implements FindUserInTargetRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindUserInTargetDto): Promise<string> {
    const findedTarget = await this.prismaService[
      'target_reference'
    ].findUnique({
      where: {
        id: input.targetId,
        user_id: input.loggedUserId,
        status: 'ACTIVE',
      },
    });

    return findedTarget?.id ?? '';
  }
}
