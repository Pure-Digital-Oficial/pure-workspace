import { hash } from 'bcrypt';
import { HashGeneratorRepository } from '@pure-workspace/domain';

export class HashGeneratorRepositoryImpl implements HashGeneratorRepository {
  async hash(input: string): Promise<string> {
    return hash(input, 10);
  }
}
