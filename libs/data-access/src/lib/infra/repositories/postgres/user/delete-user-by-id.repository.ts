import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteUserByIdDto,
  DeleteUserByIdRepository,
} from '@pure-workspace/domain';

export class DeleteUserByIdRepositoryImpl implements DeleteUserByIdRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteUserByIdDto): Promise<string> {
    await this.prismaService['confirm_delete_user'].create({
      data: {
        user_id: input.id,
        description: input.description,
        responsibly_user: input.loggedUserId,
      },
    });

    const updatedUser = await this.prismaService['user'].update({
      where: {
        id: input.id,
      },
      data: {
        status: 'INACTIVE',
      },
    });

    return updatedUser.id;
  }
}
