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
  EditTargetModule,
  ChangeTargetsTriggerModule,
} from './target';
import {
  CreateShotModelModule,
  ListShotModelsModule,
  DeleteShotModelModule,
  EditShotModelModule,
  CreateShotModule,
} from './shot';

@Module({
  imports: [
    CreateTriggerModule,
    ListTriggersModule,
    DeleteTriggerModule,
    EditTriggerModule,
    CreateUniqueTargetModule,
    ListTargetsModule,
    DeleteTargetModule,
    EditTargetModule,
    ChangeTargetsTriggerModule,
    CreateShotModelModule,
    ListShotModelsModule,
    DeleteShotModelModule,
    EditShotModelModule,
    CreateShotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
