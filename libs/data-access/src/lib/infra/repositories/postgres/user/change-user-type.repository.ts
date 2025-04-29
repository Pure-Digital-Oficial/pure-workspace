import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  ChangeUserTypeDto,
  ChangeUserTypeRepository,
  UserType,
} from '@pure-workspace/domain';

export class ChangeUserTypeRepositoryImpl implements ChangeUserTypeRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
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
