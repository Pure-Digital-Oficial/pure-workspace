export interface GeneratePaymentResponseDto {
  paymentId: number;
  qrCode: string;
  qrCodeBase64: string;
  ticketUrl: string;
}
