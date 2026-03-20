import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCustomerModule, EditCustomerStatusModule } from './customer';

@Module({
  imports: [CreateCustomerModule, EditCustomerStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
