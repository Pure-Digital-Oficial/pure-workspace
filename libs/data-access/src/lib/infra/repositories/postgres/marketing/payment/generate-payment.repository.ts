import { MercadoPagoConfig, Payment } from 'mercadopago';
import {
  GeneratePaymentForRepositoryDto,
  GeneratePaymentRepository,
  GeneratePaymentResponseDto,
} from '@pure-workspace/domain';

export class GeneratePaymentRepositoryImpl
  implements GeneratePaymentRepository
{
  async generate(
    input: GeneratePaymentForRepositoryDto
  ): Promise<GeneratePaymentResponseDto> {
    try {
      const { payerEmail, paymentMethod, planAmount, secretKey } = input;

      const client = new MercadoPagoConfig({
        accessToken: secretKey,
      });

      const payment = new Payment(client);

      const response = await payment.create({
        body: {
          transaction_amount: planAmount,
          payment_method_id: paymentMethod,
          payer: {
            email: payerEmail,
          },
        },
      });

      return {
        paymentId: response?.id ?? 0,
        qrCode: response.point_of_interaction?.transaction_data?.qr_code ?? '',
        qrCodeBase64:
          response.point_of_interaction?.transaction_data?.qr_code_base64 ?? '',
        ticketUrl:
          response.point_of_interaction?.transaction_data?.ticket_url ?? '',
      };
    } catch (error) {
      console.error('Error generating payment:', error);
      return {
        paymentId: 0,
        qrCode: '',
        qrCodeBase64: '',
        ticketUrl: '',
      };
    }
  }
}
