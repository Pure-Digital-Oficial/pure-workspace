import { BaseEntityResponseDto } from '../../utils';

export interface CharacterResponseDto extends BaseEntityResponseDto {
  id: string;
  name: string;
  description: string;
}
