export interface GeneratePaymentDto {
  loggedUserId: string;
  paymentPlataformId: string;
  paymentMethodId: string;
  planId: string;
  payerEmail: string;
}
