import { Injectable, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import {
  ErrorMessageResult,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';

@Injectable()
export class JwtAdminGuard extends JwtAuthGuard {
  constructor(
    private readonly validateAdmin: ValidateAdmin,
    private readonly validateToken: ValidateToken
  ) {
    super(validateToken);
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      return false;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const userId = super.getUserIdFromRequest(request);

    const result = await this.validateAdmin.execute(userId);

    if (result.isRight()) {
      return true;
    } else {
      await ErrorMessageResult(result.value.name, result.value.message);
      return false;
    }
  }
}
