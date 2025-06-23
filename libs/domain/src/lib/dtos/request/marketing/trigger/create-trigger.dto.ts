import { TriggerBodyDto } from './trigger.body.dto';

export interface CreateTriggerDto {
  loggedUserId: string;
  body: TriggerBodyDto;
}
