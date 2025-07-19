import { ChangeShotModelInShotDto } from '../../../../dtos';

export interface ChangeShotModelInShotRepository {
  change(input: ChangeShotModelInShotDto): Promise<string>;
}
