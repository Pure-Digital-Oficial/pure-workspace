import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTriggerModule } from './trigger';

@Module({
  imports: [CreateTriggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
