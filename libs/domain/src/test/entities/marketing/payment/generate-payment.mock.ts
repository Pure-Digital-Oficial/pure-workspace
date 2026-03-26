import { faker } from '@faker-js/faker';
import { GeneratePaymentResponseDto } from '../../../../index';

export const GeneratePaymentMock: GeneratePaymentResponseDto = {
  paymentId: faker.number.float(),
  qrCode: faker.string.binary(),
  qrCodeBase64: faker.string.binary(),
  ticketUrl: faker.internet.url(),
};
