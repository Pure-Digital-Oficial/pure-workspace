export interface GeneratePaymentForRepositoryDto {
  secretKey: string;
  paymentMethod: string;
  planAmount: number;
  payerEmail: string;
}
