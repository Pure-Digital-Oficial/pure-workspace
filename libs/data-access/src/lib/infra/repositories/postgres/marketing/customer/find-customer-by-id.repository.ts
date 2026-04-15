import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CustomerResponseDto,
  FindCustomerByIdRepository,
} from '@pure-workspace/domain';

export class FindCustomerByIdRepositoryImpl
  implements FindCustomerByIdRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(id: string): Promise<CustomerResponseDto> {
    try {
      const findedCustomer = await this.prismaService['customer'].findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          external_id: true,
          name: true,
          language: true,
          frequency_payment: true,
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
        id: findedCustomer?.id ?? '',
        externalId: findedCustomer?.external_id ?? '',
        name: findedCustomer?.name ?? '',
        language: findedCustomer?.language ?? '',
        status: findedCustomer?.status ?? '',
        updatedAt: findedCustomer?.updated_at ?? new Date(),
        createdAt: findedCustomer?.created_at ?? new Date(),
        createdBy: findedCustomer?.user.nickname ?? '',
        frequencyPayment: findedCustomer?.frequency_payment ?? '',
      };
    } catch (error) {
      console.error('Error finding customer by id:', error);

      return {
        id: '',
        externalId: '',
        name: '',
        language: '',
        status: '',
        updatedAt: new Date(),
        createdAt: new Date(),
        createdBy: '',
        frequencyPayment: '',
      };
    }
  }
}
