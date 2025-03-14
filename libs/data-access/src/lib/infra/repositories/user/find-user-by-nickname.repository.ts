import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindUserByNicknameRepository,
  UserResponseDto,
} from '@pure-workspace/domain';

export class FindUserByNicknameRepositoryImpl
  implements FindUserByNicknameRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(nickname: string): Promise<UserResponseDto> {
    const filteredUser = await this.prismaService['user'].findFirst({
      where: {
        nickname,
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
          },
        },
      },
    });

    return {
      id: filteredUser?.id ?? '',
      name: filteredUser?.name ?? '',
      nickname: filteredUser?.nickname ?? '',
      birthDate: filteredUser?.data[0].birth_date ?? new Date(),
      type: filteredUser?.type ?? '',
      auth: filteredUser?.auth ?? [],
    };
  }
}
