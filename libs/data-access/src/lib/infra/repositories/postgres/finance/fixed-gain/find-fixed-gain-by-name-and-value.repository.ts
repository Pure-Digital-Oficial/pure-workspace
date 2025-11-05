import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindFixedGainByNameAndValueDto,
  FindFixedGainByNameAndValueRepository,
  FixedGainResponseDto,
} from '@pure-workspace/domain';

export class FindFixedGainByNameAndValueRepositoryImpl
  implements FindFixedGainByNameAndValueRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(
    input: FindFixedGainByNameAndValueDto
  ): Promise<FixedGainResponseDto> {
    const { loggedUserId, name, value } = input;

    const findedFixedGain = await this.prismaService['fixed_gain'].findFirst({
      where: {
        name,
        value,
        user_id: loggedUserId,
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
