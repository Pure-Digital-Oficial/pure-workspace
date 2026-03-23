import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCustomerModule, EditCustomerStatusModule } from './customer';
import { ListPlansModule } from './plan';

@Module({
  imports: [CreateCustomerModule, EditCustomerStatusModule, ListPlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
