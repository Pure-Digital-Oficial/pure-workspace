import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateFixedGainDto,
  CreateFixedGainRepository,
} from '@pure-workspace/domain';

export class CreateFixedGainRepositoryImpl
  implements CreateFixedGainRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateFixedGainDto): Promise<string> {
    const { dayOfReceipt, frequency, loggedUserId, name, value } = input;

    const createdFixedGain = await this.prismaService['fixed_gain'].create({
      data: {
        day_of_receipt: dayOfReceipt,
        frequency,
        name,
        value,
        user_id: loggedUserId,
      },
    });

    return createdFixedGain?.id ?? '';
  }
}
