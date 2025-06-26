import { compare } from 'bcrypt';
import {
  ValidatePasswordDto,
  ValidatePasswordRepository,
} from '@pure-workspace/domain';

export class ValidatePasswordRepositoryImpl
  implements ValidatePasswordRepository
{
  async validate(input: ValidatePasswordDto): Promise<boolean> {
    const { passwordEntered, userPassword } = input;
    return compare(passwordEntered, userPassword);
  }
}
