import {
  ChangeUserTypeDto,
  ChangeUserTypeRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';
import { Inject } from '@nestjs/common';
import { UserType } from '@pure-workspace/prisma/general';

export class ChangeUserTypeRepositoryImpl implements ChangeUserTypeRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async change(input: ChangeUserTypeDto): Promise<string> {
    const { type, userId } = input;

    const changedUserType = await this.prismaService['user'].update({
      where: {
        id: userId,
      },
      data: {
        type: type as UserType,
      },
    });

    return changedUserType?.id ?? '';
  }
}
