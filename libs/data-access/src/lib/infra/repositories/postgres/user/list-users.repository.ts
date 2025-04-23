import { Inject } from '@nestjs/common';
import {
  ListUsersDto,
  ListUsersRepository,
  ListUsersResponseDto,
  UserResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';
import { Prisma } from '@pure-workspace/prisma/general';

export class ListUsersRepositoryImpl implements ListUsersRepository {
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}

  async list(input: ListUsersDto): Promise<ListUsersResponseDto> {
    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(input.filters?.name != null
        ? {
            name: {
              contains: input.filters.name.trim(),
              mode: 'insensitive' as const,
            },
          }
        : {}),

      ...(input.filters?.status != null
        ? {
            status: input.filters.status as Prisma.EnumStatusFilter<'user'>,
          }
        : {
            status: 'ACTIVE' as Prisma.EnumStatusFilter<'user'>,
          }),
    };

    const [users, filteredTotal, total] = await this.prismaService.$transaction(
      [
        this.prismaService['user'].findMany({
          where: whereClause,
          orderBy: {
            name: 'asc',
          },
          select: {
            id: true,
            name: true,
            nickname: true,
            type: true,
            data: {
              select: {
                birth_date: true,
              },
            },
            auth: {
              select: {
                id: true,
                email: true,
                password: true,
              },
            },
          },
          skip: parseInt(skip.toString()),
          take: parseInt(take.toString()),
        }),
        this.prismaService['user'].count({
          where: whereClause,
        }),
        this.prismaService['user'].count(),
      ]
    );

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedUsers: UserResponseDto[] = users.map((user) => {
      return {
        name: user.name ?? '',
        nickname: user.nickname ?? '',
        birthDate: user.data[0].birth_date ?? new Date(),
        type: user?.type ?? '',
        id: user.id ?? '',
        auth: {
          email: user?.auth[0]?.email ?? '',
          id: user?.auth[0]?.id ?? '',
          password: user?.auth[0]?.password ?? '',
        },
      };
    });

    return {
      total,
      filteredTotal,
      totalPages,
      users: mappedUsers,
    };
  }
}
