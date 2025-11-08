import { PrismaService } from 'nestjs-prisma';
import { Inject } from '@nestjs/common';
import {
  EditFixedGainDto,
  EditFixedGainRepository,
} from '@pure-workspace/domain';

export class EditFixedGainRepositoryImpl implements EditFixedGainRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async edit(input: EditFixedGainDto): Promise<string> {
    const { id, dayOfReceipt, frequency, name, value } = input;
    const editedFixedGain = await this.prismaService['fixed_gain'].update({
      where: {
        id,
      },
      data: {
        day_of_receipt: dayOfReceipt,
        frequency,
        name,
        value,
      },
    });

    return editedFixedGain?.id ?? '';
  }
}
