import { Injectable } from '@nestjs/common';
import { RefreshToken, RefreshTokenDto } from '@pure-workspace/domain';

@Injectable()
export class RefreshTokenService {
  constructor(private useCase: RefreshToken) {}
  async refresh(input: RefreshTokenDto) {
    return await this.useCase.execute(input);
  }
}
