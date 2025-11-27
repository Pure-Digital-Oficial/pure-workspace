import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  ListBudgetWithCategoryTransactionsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ValidateAdmin,
  ValidateToken,
  ListBudgetWithCategoryTransactions,
} from '@pure-workspace/domain';
import { ListBudgetWithCategoryTransactionsService } from './list-budget-with-category-transactions.service';
import { ListBudgetWithCategoryTransactionsController } from './list-budget-with-category-transactions.controller';

@Module({
  controllers: [ListBudgetWithCategoryTransactionsController],
  providers: [
    ListBudgetWithCategoryTransactions,
    ListBudgetWithCategoryTransactionsService,
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
      provide: 'ListBudgetWithCategoryTransactionsRepository',
      useClass: ListBudgetWithCategoryTransactionsRepositoryImpl,
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
export class ListBudgetWithCategoryTransactionsModule {}
