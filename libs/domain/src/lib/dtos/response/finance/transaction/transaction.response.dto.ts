export interface TransactionResponseDto {
  id: string;
  category: string;
  name: string;
  type: string;
  status: string;
  value: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
