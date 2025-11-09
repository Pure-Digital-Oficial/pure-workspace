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
  DeleteFixedGainModule,
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
    DeleteFixedGainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
