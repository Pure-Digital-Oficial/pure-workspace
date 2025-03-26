import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ErrorMessageResult, ValidateToken } from '@pure-workspace/domain';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private useCase: ValidateToken) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
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

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getUserIdFromRequest(request: Request): string {
    return request.query['userId'] as string;
  }
}
