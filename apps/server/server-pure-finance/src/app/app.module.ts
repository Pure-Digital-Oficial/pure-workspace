import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTransactionModule } from './transaction';

@Module({
  imports: [CreateTransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
