import {
  FindUserInAppDto,
  FindUserInAppRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindUserInAppRepositoryImpl implements FindUserInAppRepository {
  constructor(private prismaService: PrismaGeneralService) {}
  async find(input: FindUserInAppDto): Promise<string> {
    const { appId, userId } = input;

    const filteredUser = await this.prismaService[
      'application_x_user'
    ].findFirst({
      where: {
        app_id: appId,
        user_id: userId,
      },
    });

    return `${filteredUser?.app_id}${filteredUser?.user_id}`;
  }
}
