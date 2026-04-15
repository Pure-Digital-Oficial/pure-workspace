import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindPaymentHistoryByExternalIdRepository,
  PaymentHistoryResponseDto,
} from '@pure-workspace/domain';

export class FindPaymentHistoryByExternalIdRepositoryImpl
  implements FindPaymentHistoryByExternalIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: number): Promise<PaymentHistoryResponseDto> {
    try {
      const findedPaymentHistory = await this.prismaService[
        'payment_history'
      ].findFirst({
        where: {
          external_id: id,
        },
        select: {
          id: true,
          amount: true,
          character_id: true,
          customer_id: true,
          external_id: true,
          plan_id: true,
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
        id: findedPaymentHistory?.id ?? '',
        characterId: findedPaymentHistory?.character_id ?? '',
        customerId: findedPaymentHistory?.customer_id ?? '',
        externalId: findedPaymentHistory?.external_id ?? 0,
        amount: findedPaymentHistory?.amount ?? 0,
        planId: findedPaymentHistory?.plan_id ?? '',
        createdAt: findedPaymentHistory?.created_at ?? new Date(),
        updatedAt: findedPaymentHistory?.updated_at ?? new Date(),
        createdBy: findedPaymentHistory?.user.nickname ?? '',
        status: findedPaymentHistory?.status ?? '',
      };
    } catch (error) {
      console.error('Error finding payment history by external id:', error);
      return {
        id: '',
        characterId: '',
        customerId: '',
        externalId: 0,
        amount: 0,
        planId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: '',
        status: '',
      };
    }
  }
}
