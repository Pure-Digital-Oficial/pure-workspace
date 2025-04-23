import { Inject } from '@nestjs/common';
import {
  CreateSystemUserDto,
  CreateSystemUserRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class CreateSystemUserRepositoryImpl
  implements CreateSystemUserRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create({
    appId,
    body: { name, nickname },
  }: CreateSystemUserDto): Promise<string> {
    const systemUserCreated = await this.prismaService['user'].create({
      data: {
        name,
        nickname,
        picture: null,
        type: 'SYSTEM',
      },
    });

    await this.prismaService['application_x_user'].create({
      data: {
        app_id: appId,
        user_id: systemUserCreated.id,
      },
    });

    return systemUserCreated?.id ?? '';
  }
}
