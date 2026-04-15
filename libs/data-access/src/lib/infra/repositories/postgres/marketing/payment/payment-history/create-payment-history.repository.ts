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
    try {
      const {
        characterId,
        customerId,
        externalId,
        planId,
        amount,
        loggedUserId,
      } = input;

      const createdPaymentHistory = await this.prismaService[
        'payment_history'
      ].create({
        data: {
          amount,
          character_id: characterId,
          customer_id: customerId,
          plan_id: planId,
          external_id: externalId,
          user_id: loggedUserId,
        },
      });

      return createdPaymentHistory.id;
    } catch (error) {
      console.error('Error creating payment history:', error);
      return '';
    }
  }
}
