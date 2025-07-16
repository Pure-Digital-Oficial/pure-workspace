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
  DeleteTargetsModule,
  EditTargetModule,
  ChangeTargetsTriggerModule,
  CreateTargetsModule,
} from './target';
import {
  CreateShotModelModule,
  ListShotModelsModule,
  DeleteShotModelModule,
  EditShotModelModule,
  CreateShotModule,
  ListShotsModule,
  DeleteShotModule,
  EditShotModule,
  RegisterHistoryShotModule,
  ListHistoryShotsModule,
  RegisterHistoryShotsModule,
} from './shot';

@Module({
  imports: [
    CreateTriggerModule,
    ListTriggersModule,
    DeleteTriggerModule,
    EditTriggerModule,
    CreateUniqueTargetModule,
    ListTargetsModule,
    DeleteTargetsModule,
    EditTargetModule,
    ChangeTargetsTriggerModule,
    CreateShotModelModule,
    ListShotModelsModule,
    DeleteShotModelModule,
    EditShotModelModule,
    CreateShotModule,
    ListShotsModule,
    DeleteShotModule,
    EditShotModule,
    RegisterHistoryShotModule,
    ListHistoryShotsModule,
    RegisterHistoryShotsModule,
    CreateTargetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
