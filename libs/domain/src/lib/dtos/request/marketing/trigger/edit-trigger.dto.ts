import { TriggerBodyDto } from './trigger.body.dto';

export interface EditTriggerDto {
  id: string;
  loggedUserId: string;
  body: TriggerBodyDto;
}
