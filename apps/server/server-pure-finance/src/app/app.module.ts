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
import {
  CreateFixedGainModule,
  ListFixedGainsModule,
  EditFixedGainModule,
} from './fixed-gain';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
