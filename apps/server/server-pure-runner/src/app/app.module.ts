import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateTriggerModule,
  DeleteTriggerModule,
  ListTriggersModule,
  EditTriggerModule,
} from './trigger';
import {
  CreateUniqueTargetModule,
  ListTargetsModule,
  DeleteTargetModule,
} from './target';

@Module({
  imports: [
    CreateTriggerModule,
    ListTriggersModule,
    DeleteTriggerModule,
    EditTriggerModule,
    CreateUniqueTargetModule,
    ListTargetsModule,
    DeleteTargetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
