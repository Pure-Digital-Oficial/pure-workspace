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
import { CreateFixedGainModule } from './fixed-gain';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
