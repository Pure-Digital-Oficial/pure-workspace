import { CompanyResponseDto } from '../../dtos';

export type AppType = {
  company: CompanyResponseDto | null;
  appId: string | null;
};
