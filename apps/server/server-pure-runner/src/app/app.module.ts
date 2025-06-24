import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateTriggerModule,
  DeleteTriggerModule,
  ListTriggersModule,
  EditTriggerModule,
} from './trigger';

@Module({
  imports: [
    CreateTriggerModule,
    ListTriggersModule,
    DeleteTriggerModule,
    EditTriggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
