import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateTransactionModule,
  ListTransactionsModule,
  EditTransactionModule,
  DeleteTransactionModule,
} from './transaction';

@Module({
  imports: [
    CreateTransactionModule,
    ListTransactionsModule,
    EditTransactionModule,
    DeleteTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
