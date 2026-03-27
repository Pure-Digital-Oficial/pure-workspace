import { MercadoPagoConfig, Payment } from 'mercadopago';
import {
  ConfirmManualPaymentForRepositoryDto,
  ConfirmManualPaymentRepository,
} from '@pure-workspace/domain';

export class ConfirmManualPaymentRepositoryImpl
  implements ConfirmManualPaymentRepository
{
  async confirm(input: ConfirmManualPaymentForRepositoryDto): Promise<string> {
    const { externalId } = input;

    const client = new MercadoPagoConfig({
      accessToken: 'SEU_ACCESS_TOKEN',
    });

    const payment = new Payment(client);

    const result = await payment.get({
      id: externalId,
    });

    return result.status ?? '';
  }
}
