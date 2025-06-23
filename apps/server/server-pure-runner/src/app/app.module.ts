import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateTriggerModule,
  DeleteTriggerModule,
  ListTriggersModule,
} from './trigger';

@Module({
  imports: [CreateTriggerModule, ListTriggersModule, DeleteTriggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
