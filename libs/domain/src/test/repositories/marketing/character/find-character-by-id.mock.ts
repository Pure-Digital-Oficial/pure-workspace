import {
  CharacterResponseDto,
  FindCharacterByIdRepository,
} from '../../../../index';
import { CharacterMock } from '../../../entities';

export class FindCharacterByIdRepositoryMock
  implements FindCharacterByIdRepository
{
  inputMock = '';
  async find(id: string): Promise<CharacterResponseDto> {
    this.inputMock = id;
    return CharacterMock;
  }
}
