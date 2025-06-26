export interface HashGeneratorRepository {
  hash(key: string): Promise<string>;
}
