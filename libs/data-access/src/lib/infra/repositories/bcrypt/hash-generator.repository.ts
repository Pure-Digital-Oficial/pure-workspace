import { HashGeneratorRepository } from '@pure-workspace/domain';
import * as bcrypt from 'bcrypt';

export class HashGeneratorRepositoryImpl implements HashGeneratorRepository {
  async hash(input: string): Promise<string> {
    return bcrypt.hash(input, 10);
  }
}
