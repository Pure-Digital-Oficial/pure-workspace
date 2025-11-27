import { GeneralStatus } from '../../../../types';

export interface BudgetWithCategoryTransactionPrismaResponseDto {
  category: {
    created_at: Date;
    user: {
      nickname: string;
    };
    id: string;
    name: string;
    description: string;
    status: GeneralStatus;
    updated_at: Date;
  };
  budget: {
    created_at: Date;
    user: {
      nickname: string;
    };
    id: string;
    name: string;
    description: string;
    status: GeneralStatus;
    limit_value: number;
    updated_at: Date;
  };
}
