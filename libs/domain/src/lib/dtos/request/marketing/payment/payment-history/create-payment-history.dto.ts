export interface CreatePaymentHistoryDto {
  loggedUserId: string;
  customerId: string;
  characterId: string;
  planId: string;
  externalId: number;
  amount: number;
}
