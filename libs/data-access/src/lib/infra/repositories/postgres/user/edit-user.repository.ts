import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { EditUserDto, EditUserRepository } from '@pure-workspace/domain';

export class EditUserRepositoryImpl implements EditUserRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditUserDto): Promise<string> {
    const {
      body: { id, name, birthDate, status, picture },
    } = input;

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
        status: status,
        updated_at: new Date(),
      },
    });

    return editedUser.id;
  }
}
