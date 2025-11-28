import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  FindBudgetByIdRepositoryImpl,
  FindCategoryTransactionByIdRepositoryImpl,
  FindBudgetWithCategoryTransactionByIdsRepositoryImpl,
  DeleteBudgetWithCategoryTransactionRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  DeleteBudgetWithCategoryTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { DeleteBudgetWithCategoryTransactionController } from './delete-budget-with-category-transaction.controller';
import { DeleteBudgetWithCategoryTransactionService } from './delete-budget-with-category-transaction.service';

@Module({
  controllers: [DeleteBudgetWithCategoryTransactionController],
  providers: [
    DeleteBudgetWithCategoryTransaction,
    DeleteBudgetWithCategoryTransactionService,
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
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
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
      provide: 'DeleteBudgetWithCategoryTransactionRepository',
      useClass: DeleteBudgetWithCategoryTransactionRepositoryImpl,
    },
    {
      provide: 'FindBudgetByIdRepository',
      useClass: FindBudgetByIdRepositoryImpl,
    },
    {
      provide: 'FindCategoryTransactionByIdRepository',
      useClass: FindCategoryTransactionByIdRepositoryImpl,
    },
    {
      provide: 'FindBudgetWithCategoryTransactionByIdsRepository',
      useClass: FindBudgetWithCategoryTransactionByIdsRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class DeleteBudgetWithCategoryTransactionModule {}
