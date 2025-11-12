import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  DeleteBudgetRepositoryImpl,
  FindBudgetByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  DeleteBudget,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { DeleteBudgetService } from './delete-budget.service';
import { DeleteBudgetController } from './delete-budget.controller';

@Module({
  controllers: [DeleteBudgetController],
  providers: [
    DeleteBudgetService,
    DeleteBudget,
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
      provide: 'DeleteBudgetRepository',
      useClass: DeleteBudgetRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindBudgetByIdRepository',
      useClass: FindBudgetByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class DeleteBudgetModule {}
