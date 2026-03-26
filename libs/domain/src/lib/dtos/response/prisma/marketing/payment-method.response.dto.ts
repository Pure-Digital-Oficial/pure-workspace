import { GeneralStatus } from '../../../../types';

export interface PaymentMethodPrismaReponseDto {
  status: GeneralStatus;
  id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user: {
    nickname: string;
  };
  value: string;
}
