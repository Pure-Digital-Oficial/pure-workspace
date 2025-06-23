import { Inject } from '@nestjs/common';
import {
  FindUserInTriggerDto,
  FindUserInTriggerRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../../application';

export class FindUserInTriggerRepositoryImpl
  implements FindUserInTriggerRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(input: FindUserInTriggerDto): Promise<string> {
    const findedTrigger = await this.prismaService['trigger'].findUnique({
      where: {
        id: input.id,
        user_id: input.loggedUserId,
      },
    });

    return findedTrigger?.id ?? '';
  }
}
