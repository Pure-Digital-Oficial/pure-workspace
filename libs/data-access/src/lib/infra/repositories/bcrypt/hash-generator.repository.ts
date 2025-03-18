import { HashGeneratorRepository } from '@pure-workspace/domain';
import { hash } from 'bcrypt';

export class HashGeneratorRepositoryImpl implements HashGeneratorRepository {
  async hash(input: string): Promise<string> {
    return hash(input, 10);
  }
}
