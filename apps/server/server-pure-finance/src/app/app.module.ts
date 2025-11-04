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
} from './transaction';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
