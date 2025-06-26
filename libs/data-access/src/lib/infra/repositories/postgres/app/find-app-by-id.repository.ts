import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AppResponseDto, FindAppByIdRepository } from '@pure-workspace/domain';

export class FindAppByIdRepositoryImpl implements FindAppByIdRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<AppResponseDto> {
    const filteredApp = await this.prismaService['application'].findFirst({
      where: {
        id,
        status: 'ACTIVE',
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      id: filteredApp?.id ?? '',
      name: filteredApp?.name ?? '',
    };
  }
}
