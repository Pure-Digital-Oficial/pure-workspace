import {
  FindUserInAppDto,
  FindUserInAppRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class FindUserInAppRepositoryImpl implements FindUserInAppRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: FindUserInAppDto): Promise<string> {
    const { appId, userId } = input;
    const filteredUser = await this.prismaService[
      'application_x_user'
    ].findUnique({
      where: {
        user_id_app_id: {
          app_id: appId,
          user_id: userId,
        },
      },
    });

    return `${filteredUser?.app_id}${filteredUser?.user_id}`;
  }
}
