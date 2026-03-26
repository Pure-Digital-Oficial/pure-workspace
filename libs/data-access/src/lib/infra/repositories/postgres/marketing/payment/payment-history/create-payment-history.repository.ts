import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreatePaymentHistoryDto,
  CreatePaymentHistoryRepository,
} from '@pure-workspace/domain';

export class CreatePaymentHistoryRepositoryImpl
  implements CreatePaymentHistoryRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreatePaymentHistoryDto): Promise<string> {
    const { characterId, customerId, externalId, planId, amount } = input;

    const createdPaymentHistory = await this.prismaService[
      'payment_history'
    ].create({
      data: {
        amount,
        character_id: characterId,
        customer_id: customerId,
        plan_id: planId,
        external_id: externalId,
      },
    });

    return createdPaymentHistory.id;
  }
}
