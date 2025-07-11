import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {
  ErrorMessageResult,
  ExtractTokenFromHeader,
  ValidateToken,
} from '@pure-workspace/domain';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private useCase: ValidateToken) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = ExtractTokenFromHeader(request);
    const user = this.getUserIdFromRequest(request);

    const result = await this.useCase.execute({
      token: token ?? '',
      userId: user ?? '',
    });

    if (result.isRight()) {
      return true;
    } else {
      await ErrorMessageResult(result.value.name, result.value.message);
      return false;
    }
  }

  protected getUserIdFromRequest(request: Request): string {
    return request.query['userId'] as string;
  }
}
