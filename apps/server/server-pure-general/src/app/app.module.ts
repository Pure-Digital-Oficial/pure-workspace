import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserModule } from './user';
import { AuthModule, CreateAuthModule } from './auth';

@Module({
  imports: [CreateUserModule, CreateAuthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
