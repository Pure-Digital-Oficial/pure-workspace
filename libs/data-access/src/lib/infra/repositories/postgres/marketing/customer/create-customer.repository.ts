import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateCustomerDto,
  CreateCustomerRepository,
} from '@pure-workspace/domain';

export class CreateCustomerRepositoryImpl implements CreateCustomerRepository {
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async create(input: CreateCustomerDto): Promise<string> {
    try {
      const { externalId, loggedUserId, name, language } = input;

      const createdCustomer = await this.prismaService['customer'].create({
        data: {
          external_id: externalId,
          user_id: loggedUserId,
          name,
          language,
        },
      });
      return createdCustomer.id;
    } catch (error) {
      console.error('Error creating customer:', error);
      return '';
    }
  }
}
