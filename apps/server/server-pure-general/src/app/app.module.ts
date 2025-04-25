import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CreateSystemUserModule,
  CreateUserModule,
  ListUsersModule,
  DeleteUserByIdModule,
} from './user';
import {
  AuthModule,
  CreateAuthModule,
  RefreshTokenModule,
  GetSessionModule,
} from './auth';

@Module({
  imports: [
    CreateUserModule,
    CreateSystemUserModule,
    CreateAuthModule,
    AuthModule,
    RefreshTokenModule,
    GetSessionModule,
    ListUsersModule,
    DeleteUserByIdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
