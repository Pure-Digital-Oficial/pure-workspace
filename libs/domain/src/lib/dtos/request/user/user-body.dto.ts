import { GeneralStatus } from '../../../types';

export interface UserBodyDto {
  id: string;
  name: string;
  nickname: string;
  birthDate?: Date;
  status: GeneralStatus;
  type: string;
  picture?: string;
}
