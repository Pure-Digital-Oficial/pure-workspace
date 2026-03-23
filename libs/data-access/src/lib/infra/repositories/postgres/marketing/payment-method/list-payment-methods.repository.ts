import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  GeneralStatus,
  ListPaymentMethodsDto,
  ListPaymentMethodsRepository,
  ListPaymentMethodsResponseDto,
  PaymentMethodPrismaReponseDto,
  PaymentMethodResponseDto,
} from '@pure-workspace/domain';

export class ListPaymentMethodsRepositoryImpl
  implements ListPaymentMethodsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async list(
    input: ListPaymentMethodsDto
  ): Promise<ListPaymentMethodsResponseDto> {
    const { filters } = input;

    const skip = input?.skip || 0;
    const take = input?.take || 6;

    const whereClause = {
      ...(filters?.title != null
        ? {
            title: {
              contains: filters.title.trim(),
              mode: 'insensitive' as const,
            },
          }
        : {}),
      ...(filters?.status != null
        ? {
            status: {
              equals: filters.status as GeneralStatus,
            },
          }
        : {
            status: {
              equals: 'ACTIVE' as GeneralStatus,
            },
          }),
    };

    const [paymentMethods, filteredTotal, total] = await this.prismaService[
      '$transaction'
    ]([
      this.prismaService['payment_method'].findMany({
        where: whereClause,
        orderBy: {
          title: 'asc',
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              nickname: true,
            },
          },
        },
        skip: parseInt(skip.toString()),
        take: parseInt(take.toString()),
      }),
      this.prismaService['payment_method'].count({
        where: whereClause,
      }),
      this.prismaService['payment_method'].count(),
    ]);

    const totalPages = Math.ceil(filteredTotal / take);

    const mappedPaymentMethods: PaymentMethodResponseDto[] = paymentMethods.map(
      (paymentMethod: PaymentMethodPrismaReponseDto) => {
        return {
          id: paymentMethod?.id ?? '',
          title: paymentMethod?.title ?? '',
          description: paymentMethod?.description ?? '',
          createdAt: paymentMethod?.created_at ?? new Date(),
          updatedAt: paymentMethod?.updated_at ?? new Date(),
          createdBy: paymentMethod?.user.nickname ?? '',
          status: paymentMethod?.status ?? '',
        };
      }
    );

    return {
      total,
      filteredTotal,
      totalPages,
      paymentMethods: mappedPaymentMethods,
    };
  }
}
