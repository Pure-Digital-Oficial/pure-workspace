import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindPaymentPlataformByIdRepository,
  PaymentPlataformResponseDto,
} from '@pure-workspace/domain';

export class FindPaymentPlataformByIdRepositoryImpl
  implements FindPaymentPlataformByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<PaymentPlataformResponseDto> {
    const findedPaymentPlataform = await this.prismaService[
      'payment_plataform'
    ].findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        key: true,
        secret_key: true,
        nationality: true,
        user: {
          select: {
            nickname: true,
          },
        },
        status: true,
        updated_at: true,
        created_at: true,
      },
    });

    return {
      id: findedPaymentPlataform?.id ?? '',
      title: findedPaymentPlataform?.title ?? '',
      description: findedPaymentPlataform?.description ?? '',
      key: findedPaymentPlataform?.key ?? '',
      secretKey: findedPaymentPlataform?.secret_key ?? '',
      nationality: findedPaymentPlataform?.nationality ?? '',
      status: findedPaymentPlataform?.status ?? '',
      createdBy: findedPaymentPlataform?.user.nickname ?? '',
      createdAt: findedPaymentPlataform?.created_at ?? new Date(),
      updatedAt: findedPaymentPlataform?.updated_at ?? new Date(),
    };
  }
}
