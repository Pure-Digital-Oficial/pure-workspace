import { MercadoPagoConfig, Payment } from 'mercadopago';
import {
  ConfirmManualPaymentForRepositoryDto,
  ConfirmManualPaymentRepository,
} from '@pure-workspace/domain';

export class ConfirmManualPaymentRepositoryImpl
  implements ConfirmManualPaymentRepository
{
  async confirm(input: ConfirmManualPaymentForRepositoryDto): Promise<string> {
    try {
      const { externalId, secretKey } = input;

      const client = new MercadoPagoConfig({
        accessToken: secretKey,
      });

      const payment = new Payment(client);

      const result = await payment.get({
        id: externalId,
      });

      return result.status ?? '';
    } catch (error) {
      console.error('Error confirming manual payment:', error);
      return '';
    }
  }
}
