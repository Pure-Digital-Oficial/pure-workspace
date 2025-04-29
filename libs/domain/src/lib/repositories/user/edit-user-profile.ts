import { EditUserProfileDto } from '../../dtos';

export interface EditUserProfileRepository {
  edit(input: EditUserProfileDto): Promise<string>;
}
