import { InternalStatus } from '../../../../types';

export interface TargetBodyDto {
  content: string;
  triggerId: string;
  loggedUserId: string;
  internalStatus?: InternalStatus;
}
