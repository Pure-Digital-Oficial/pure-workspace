import { ShotModelBodyDto } from './shot-model-body.dto';

export interface CreateShotModelDto extends ShotModelBodyDto {
  loggedUserId: string;
}
