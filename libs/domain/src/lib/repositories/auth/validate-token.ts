export interface ValidateTokenRepository {
  validate(token: string): Promise<string>;
}
