import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  CreateBudgetWithCategoryTransactionRepositoryImpl,
  FindBudgetByIdRepositoryImpl,
  FindCategoryTransactionByIdRepositoryImpl,
  FindBudgetWithCategoryTransactionByIdsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  CreateBudgetWithCategoryTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreateBudgetWithCategoryTransactionController } from './create-budget-with-category-transaction.controller';
import { CreateBudgetWithCategoryTransactionService } from './create-budget-with-category-transaction.service';

@Module({
  controllers: [CreateBudgetWithCategoryTransactionController],
  providers: [
    CreateBudgetWithCategoryTransaction,
    CreateBudgetWithCategoryTransactionService,
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
      provide: 'CreateBudgetWithCategoryTransactionRepository',
      useClass: CreateBudgetWithCategoryTransactionRepositoryImpl,
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
export class CreateBudgetWithCategoryTransactionModule {}
