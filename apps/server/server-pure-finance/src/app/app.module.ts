import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTransactionModule, ListTransactionsModule } from './transaction';

@Module({
  imports: [CreateTransactionModule, ListTransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
