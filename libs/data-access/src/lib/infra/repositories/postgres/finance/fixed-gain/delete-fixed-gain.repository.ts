import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  DeleteFixedGainDto,
  DeleteFixedGainRepository,
} from '@pure-workspace/domain';

export class DeleteFixedGainRepositoryImpl
  implements DeleteFixedGainRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async delete(input: DeleteFixedGainDto): Promise<string> {
    const { id } = input;
    const deletedFixedGain = await this.prismaService['fixed_gain'].update({
      where: {
        id,
      },
      data: {
        status: 'INACTIVE',
        deleted_at: new Date(),
      },
    });

    return deletedFixedGain.id ?? '';
  }
}
