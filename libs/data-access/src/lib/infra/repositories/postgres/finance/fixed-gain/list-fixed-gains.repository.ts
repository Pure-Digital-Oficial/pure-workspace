import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FixedGainPrismaResponseDto,
  FixedGainResponseDto,
  ListFixedGainsDto,
  ListFixedGainsRepository,
  ListFixedGainsResponseDto,
} from '@pure-workspace/domain';

export class ListFixedGainsRepositoryImpl implements ListFixedGainsRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(input: ListFixedGainsDto): Promise<ListFixedGainsResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.name != null
        ? {
            name: {
              contains: input.filters.name.trim(),
              mode: 'insensitive' as const,
            },
            status: {
              not: {
                equals: 'INACTIVE' as const,
              },
            },
          }
        : {
            status: {
              not: {
                equals: 'INACTIVE' as const,
              },
            },
          }),
    };

    const [fixedGains, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['fixed_gain'].findMany({
        where: whereClause,
        orderBy: {
          created_at: 'desc',
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
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['fixed_gain'].count({
        where: whereClause,
      }),
      this.prismaService['fixed_gain'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedFixedGains: FixedGainResponseDto[] = fixedGains.map(
      (fixedGain: FixedGainPrismaResponseDto) => {
        return {
          id: fixedGain?.id ?? '',
          name: fixedGain?.name ?? '',
          value: fixedGain?.value ?? '',
          status: fixedGain?.status ?? '',
          frequency: fixedGain?.frequency ?? '',
          dayOfReceipt: fixedGain?.day_of_receipt ?? '',
          createdBy: fixedGain?.user.nickname ?? '',
          createdAt: fixedGain?.created_at ?? new Date(),
          updatedAt: fixedGain?.updated_at ?? new Date(),
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      fixedGains: mappedFixedGains,
    };
  }
}
