import { TargetBodyDto } from './target-body.dto';

export interface CreateTargetsDto extends Omit<TargetBodyDto, 'content'> {
  contents: string[];
}
