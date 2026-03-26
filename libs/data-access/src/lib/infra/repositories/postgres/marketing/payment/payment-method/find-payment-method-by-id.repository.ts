import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindPaymentMethodByIdRepository,
  PaymentMethodResponseDto,
} from '@pure-workspace/domain';

export class FindPaymentMethodByIdRepositoryImpl
  implements FindPaymentMethodByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<PaymentMethodResponseDto> {
    const findedPaymentMethod = await this.prismaService[
      'payment_method'
    ].findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        created_at: true,
        updated_at: true,
        value: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    return {
      id: findedPaymentMethod?.id ?? '',
      title: findedPaymentMethod?.title ?? '',
      description: findedPaymentMethod?.description ?? '',
      createdAt: findedPaymentMethod?.created_at ?? new Date(),
      updatedAt: findedPaymentMethod?.updated_at ?? new Date(),
      createdBy: findedPaymentMethod?.user.nickname ?? '',
      status: findedPaymentMethod?.status ?? '',
      value: findedPaymentMethod?.value ?? '',
    };
  }
}
