import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCustomerModule, EditCustomerStatusModule } from './customer';
import { ListPlansModule } from './plan';
import { ListPaymentMethodsModule } from './payment-method';

@Module({
  imports: [
    CreateCustomerModule,
    EditCustomerStatusModule,
    ListPlansModule,
    ListPaymentMethodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
