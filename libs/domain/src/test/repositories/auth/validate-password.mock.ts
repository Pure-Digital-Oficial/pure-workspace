import {
  ValidatePasswordDto,
  ValidatePasswordRepository,
} from '../../../../src';

export class ValidatePasswordRepositoryMock
  implements ValidatePasswordRepository
{
  inputMock = {} as ValidatePasswordDto;
  async validate(input: ValidatePasswordDto): Promise<boolean> {
    this.inputMock = input;
    return true;
  }
}
