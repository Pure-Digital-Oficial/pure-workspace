import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto, CreateUserRepository } from '@pure-workspace/domain';

export class CreateUserRepositoryImpl implements CreateUserRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create({
    appId,
    body: { name, nickname, picture },
  }: CreateUserDto): Promise<string> {
    const userCreated = await this.prismaService['user'].create({
      data: {
        name,
        nickname,
        picture,
      },
    });

    await this.prismaService['application_x_user'].create({
      data: {
        app_id: appId,
        user_id: userCreated.id,
      },
    });

    return userCreated?.id ?? '';
  }
}
