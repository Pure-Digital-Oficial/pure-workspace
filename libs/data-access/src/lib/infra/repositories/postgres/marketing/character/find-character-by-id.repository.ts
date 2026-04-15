import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CharacterResponseDto,
  FindCharacterByIdRepository,
} from '@pure-workspace/domain';

export class FindCharacterByIdRepositoryImpl
  implements FindCharacterByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<CharacterResponseDto> {
    try {
      const findedCharacter = await this.prismaService['character'].findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          status: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
      });

      return {
        id: findedCharacter?.id ?? '',
        name: findedCharacter?.name ?? '',
        description: findedCharacter?.description ?? '',
        createdAt: findedCharacter?.created_at ?? new Date(),
        updatedAt: findedCharacter?.updated_at ?? new Date(),
        status: findedCharacter?.status ?? '',
        createdBy: findedCharacter?.user.nickname ?? '',
      };
    } catch (error) {
      console.error('Error finding character by id:', error);

      return {
        id: '',
        name: '',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: '',
        createdBy: '',
      };
    }
  }
}
