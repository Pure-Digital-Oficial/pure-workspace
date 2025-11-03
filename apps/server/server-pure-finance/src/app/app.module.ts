import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateTransactionModule,
  ListTransactionsModule,
  EditTransactionModule,
  DeleteTransactionModule,
  CreateCategoryTransactionModule,
} from './transaction';

@Module({
  imports: [
    CreateTransactionModule,
    ListTransactionsModule,
    EditTransactionModule,
    DeleteTransactionModule,
    CreateCategoryTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
