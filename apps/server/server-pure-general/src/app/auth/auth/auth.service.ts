import { Injectable } from '@nestjs/common';
import { Auth, AuthDto } from '@pure-workspace/domain';

@Injectable()
export class AuthService {
  constructor(private useCase: Auth) {}
  async auth(input: AuthDto) {
    return await this.useCase.execute(input);
  }
}
