import { Inject } from '@nestjs/common';
import {
  FindUserByEmailRepository,
  UserResponseDto,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from '../../../../application';

export class FindUserByEmailRepositoryImpl
  implements FindUserByEmailRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async find(email: string): Promise<UserResponseDto> {
    const filteredUser = await this.prismaService['user'].findFirst({
      where: {
        auth: {
          some: {
            email,
          },
        },
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
