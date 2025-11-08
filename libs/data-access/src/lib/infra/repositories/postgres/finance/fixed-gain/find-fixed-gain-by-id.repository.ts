import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindFixedGaindByIdRepository,
  FixedGainResponseDto,
} from '@pure-workspace/domain';

export class FindFixedGainByIdRepositoryImpl
  implements FindFixedGaindByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<FixedGainResponseDto> {
    const findedFixedGain = await this.prismaService['fixed_gain'].findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        frequency: true,
        day_of_receipt: true,
        status: true,
        created_at: true,
        updated_at: true,
        value: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return {
      id: findedFixedGain?.id ?? '',
      name: findedFixedGain?.name ?? '',
      frequency: findedFixedGain?.frequency ?? '',
      status: findedFixedGain?.status ?? '',
      value: findedFixedGain?.value ?? 0,
      dayOfReceipt: findedFixedGain?.day_of_receipt ?? 0,
      createdAt: findedFixedGain?.created_at ?? new Date(),
      updatedAt: findedFixedGain?.updated_at ?? new Date(),
      createdBy: findedFixedGain?.user.nickname ?? '',
    };
  }
}
