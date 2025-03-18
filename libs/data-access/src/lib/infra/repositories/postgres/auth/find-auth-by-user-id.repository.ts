import { Inject } from '@nestjs/common';
import { FindAuthByUserIdRepository } from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindAuthByUserIdRepositoryImpl
  implements FindAuthByUserIdRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(id: string): Promise<string> {
    const filteredAuth = await this.prismaService['auth'].findFirst({
      where: {
        user_id: id,
      },
    });

    return filteredAuth?.id ?? '';
  }
}
