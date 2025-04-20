import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { FindUserByIdRepository, ValidateToken } from '@pure-workspace/domain';

@Injectable()
export class JwtAdminGuard extends JwtAuthGuard {
  constructor(
    @Inject('FindUserByIdRepository')
    private readonly findUserByIdRepository: FindUserByIdRepository,
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

    const user = await this.findUserByIdRepository.find(userId);

    if (user.type === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

}
