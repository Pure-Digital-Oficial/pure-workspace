import { Injectable } from '@nestjs/common';
import { RefreshToken, TokenDto } from '@pure-workspace/domain';

@Injectable()
export class RefreshTokenService {
  constructor(private useCase: RefreshToken) {}
  async refresh(input: TokenDto) {
    return await this.useCase.execute(input);
  }
}
