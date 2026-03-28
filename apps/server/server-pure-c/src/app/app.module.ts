import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCustomerModule, EditCustomerStatusModule } from './customer';
import { ListPlansModule } from './plan';
import {
  ListPaymentMethodsModule,
  GeneratePaymentModule,
  CreatePaymentHistoryModule,
  ConfirmManualPaymentModule,
} from './payment';

@Module({
  imports: [
    CreateCustomerModule,
    EditCustomerStatusModule,
    ListPlansModule,
    ListPaymentMethodsModule,
    GeneratePaymentModule,
    CreatePaymentHistoryModule,
    ConfirmManualPaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
