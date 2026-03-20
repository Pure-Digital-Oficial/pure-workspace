import { Inject } from '@nestjs/common';
import {
  CustomerStatus,
  EditCustomerStatusDto,
  EditCustomerStatusRepository,
} from '@pure-workspace/domain';
import { PrismaGeneralService } from 'libs/data-access/src/lib/application';

export class EditCustomerStatusRepositoryImpl
  implements EditCustomerStatusRepository
{
  constructor(
    @Inject('PrismaService') private prismaService: PrismaGeneralService
  ) {}
  async edit(input: EditCustomerStatusDto): Promise<string> {
    const { id, status } = input;

    const editedCustomer = await this.prismaService['customer'].update({
      where: {
        id,
      },
      data: {
        customer_status: status as CustomerStatus,
      },
    });

    return editedCustomer.id;
  }
}
