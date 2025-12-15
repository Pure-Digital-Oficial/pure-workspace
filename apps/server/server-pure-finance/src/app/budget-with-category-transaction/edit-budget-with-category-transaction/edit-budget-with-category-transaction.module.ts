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
  EditBudgetWithCategoryTransactionRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  EditBudgetWithCategoryTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { EditBudgetWithCategoryTransactionController } from './edit-budget-with-category-transaction.controller';
import { EditBudgetWithCategoryTransactionService } from './edit-budget-with-category-transaction.service';

@Module({
  controllers: [EditBudgetWithCategoryTransactionController],
  providers: [
    EditBudgetWithCategoryTransaction,
    EditBudgetWithCategoryTransactionService,
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
      provide: 'EditBudgetWithCategoryTransactionRepository',
      useClass: EditBudgetWithCategoryTransactionRepositoryImpl,
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
export class EditBudgetWithCategoryTransactionModule {}
