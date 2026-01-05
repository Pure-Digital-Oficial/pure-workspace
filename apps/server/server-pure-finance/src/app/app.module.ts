import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateTransactionModule,
  ListTransactionsModule,
  EditTransactionModule,
  DeleteTransactionModule,
  CreateCategoryTransactionModule,
  ListCategoryTransactionsModule,
  EditCategoryTransactionModule,
  DeleteCategoryTransactionModule,
  ListTotalTransactionsModule,
} from './transaction';
import {
  CreateFixedGainModule,
  ListFixedGainsModule,
  EditFixedGainModule,
  DeleteFixedGainModule,
} from './fixed-gain';
import {
  CreateBudgetModule,
  EditBudgetModule,
  ListBudgetsModule,
  DeleteBudgetModule,
} from './budget';
import {
  CreateBudgetWithCategoryTransactionModule,
  ListBudgetWithCategoryTransactionsModule,
  DeleteBudgetWithCategoryTransactionModule,
  EditBudgetWithCategoryTransactionModule,
} from './budget-with-category-transaction';

@Module({
  imports: [
    CreateTransactionModule,
    ListTransactionsModule,
    EditTransactionModule,
    DeleteTransactionModule,
    CreateCategoryTransactionModule,
    ListCategoryTransactionsModule,
    EditCategoryTransactionModule,
    DeleteCategoryTransactionModule,
    CreateFixedGainModule,
    ListFixedGainsModule,
    EditFixedGainModule,
    DeleteFixedGainModule,
    CreateBudgetModule,
    ListBudgetsModule,
    EditBudgetModule,
    DeleteBudgetModule,
    CreateBudgetWithCategoryTransactionModule,
    ListBudgetWithCategoryTransactionsModule,
    DeleteBudgetWithCategoryTransactionModule,
    EditBudgetWithCategoryTransactionModule,
    ListTotalTransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
