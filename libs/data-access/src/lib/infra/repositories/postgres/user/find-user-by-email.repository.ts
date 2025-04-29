import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindUserByEmailRepository,
  UserResponseDto,
} from '@pure-workspace/domain';

export class FindUserByEmailRepositoryImpl
  implements FindUserByEmailRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(email: string): Promise<UserResponseDto> {
    const filteredUser = await this.prismaService['user'].findFirst({
      where: {
        auth: {
          some: {
            email,
          },
        },
        status: 'ACTIVE',
      },
      select: {
        id: true,
        name: true,
        nickname: true,
        picture: true,
        created_at: true,
        updated_at: true,
        type: true,
        status: true,
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
    });

    return {
      id: filteredUser?.id ?? '',
      name: filteredUser?.name ?? '',
      nickname: filteredUser?.nickname ?? '',
      birthDate: filteredUser?.data[0]?.birth_date ?? new Date(),
      type: filteredUser?.type ?? '',
      picture: filteredUser?.picture ?? '',
      auth: {
        email: filteredUser?.auth[0]?.email ?? '',
        id: filteredUser?.auth[0]?.id ?? '',
        password: filteredUser?.auth[0]?.password ?? '',
      },
    };
  }
}
