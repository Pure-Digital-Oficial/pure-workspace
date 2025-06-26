import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { FindAuthByUserIdRepository } from '@pure-workspace/domain';

export class FindAuthByUserIdRepositoryImpl
  implements FindAuthByUserIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<string> {
    const filteredAuth = await this.prismaService['auth'].findFirst({
      where: {
        user_id: id,
      },
    });

    return filteredAuth?.id ?? '';
  }
}
