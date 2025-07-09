import { HistoryShotMock } from '../../../../entities';
import {
  RegisterHistoryShotDto,
  RegisterHistoryShotRepository,
} from '../../../../../../src';

export class RegisterHistoryShotRepositoryMock
  implements RegisterHistoryShotRepository
{
  inputMock = {} as RegisterHistoryShotDto;
  async register(input: RegisterHistoryShotDto): Promise<string> {
    this.inputMock = input;
    return HistoryShotMock.id;
  }
}
