import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTriggerModule, ListTriggersModule } from './trigger';

@Module({
  imports: [CreateTriggerModule, ListTriggersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
