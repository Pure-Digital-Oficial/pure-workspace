import { Inject } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  FindPaymentMethodWithPlataformByIdsRepository,
  PaymentMethodWithPlataformDto,
} from '@pure-workspace/domain';

export class FindPaymentMethodWithPlataformByIdsRepositoryImpl
  implements FindPaymentMethodWithPlataformByIdsRepository
{
  constructor(@Inject('PrismaService') private prismaService: PrismaService) {}
  async find(input: PaymentMethodWithPlataformDto): Promise<string> {
    try {
      const { paymentMethodId, paymentPlataformId } = input;

      const findedRelationship = await this.prismaService[
        'payment_plataform_x_payment_method'
      ].findUnique({
        where: {
          plataform_id_payment_method_id: {
            payment_method_id: paymentMethodId,
            plataform_id: paymentPlataformId,
          },
        },
      });

      return `${findedRelationship?.payment_method_id}-${findedRelationship?.plataform_id}`;
    } catch (error) {
      console.error('Error finding payment method with plataform:', error);
      return '';
    }
  }
}
