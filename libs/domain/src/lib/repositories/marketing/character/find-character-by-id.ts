import { CharacterResponseDto } from '../../../dtos';

export interface FindCharacterByIdRepository {
  find(id: string): Promise<CharacterResponseDto>;
}
