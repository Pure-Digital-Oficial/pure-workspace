import { Inject } from '@nestjs/common';
import { DeleteShotDto, DeleteShotRepository } from '@pure-workspace/domain';
import { PrismaService } from 'nestjs-prisma';

export class DeleteShotRepositoryImpl implements DeleteShotRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteShotDto): Promise<string> {
    const updatedShot = await this.prismaService['shot'].update({
      where: {
        id: input.id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return updatedShot.id;
  }
}
