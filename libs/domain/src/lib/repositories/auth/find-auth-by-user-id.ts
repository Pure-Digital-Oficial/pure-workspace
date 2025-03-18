export interface FindAuthByUserIdRepository {
  find(id: string): Promise<string>;
}
