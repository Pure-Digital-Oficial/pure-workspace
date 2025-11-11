import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  ListBudgetsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ListBudgets,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListBudgetsService } from './list-budgets.service';
import { ListBudgetsController } from './list-budgets.controller';

@Module({
  controllers: [ListBudgetsController],
  providers: [
    ListBudgets,
    ListBudgetsService,
    ValidateToken,
    ValidateAdmin,
    {
      provide: JwtAdminGuard,
      useFactory: (
        validateAdmin: ValidateAdmin,
        validateToken: ValidateToken
      ) => new JwtAdminGuard(validateAdmin, validateToken),
      inject: [ValidateAdmin, ValidateToken],
    },
    {
      provide: 'ValidateTokenRepository',
      useClass: ValidateTokenRepositoryImpl,
    },
    {
      provide: 'JwtService',
      useClass: JwtService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListBudgetsRepository',
      useClass: ListBudgetsRepositoryImpl,
    },
    {
      provide: 'ValidateTokenRepository',
      useClass: ValidateTokenRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class ListBudgetsModule {}
