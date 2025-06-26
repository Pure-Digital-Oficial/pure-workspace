import {
  EditUserProfileDto,
  EditUserProfileRepository,
} from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';

export class EditUserProfileRepositoryImpl
  implements EditUserProfileRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditUserProfileDto): Promise<string> {
    const { id, name, birthDate, picture, email } = input;

    const editedUser = await this.prismaService['user'].update({
      where: {
        id,
      },
      data: {
        name,
        ...(Object.keys({ birthDate }).length > 1
          ? { birth_date: birthDate }
          : {}),
        ...(picture !== null ? { picture } : {}),
        auth: {
          update: {
            where: {
              user_id: id,
            },
            data: {
              email,
            },
          },
        },
        updated_at: new Date(),
      },
    });

    return editedUser.id;
  }
}
