import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindAppByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  GetSessionRepositoryImpl,
} from '@pure-workspace/data-access';
import { GetSession } from '@pure-workspace/domain';
import { GetSessionService } from './get-session.service';
import { GetSessionController } from './get-session.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [GetSessionController],
  providers: [
    GetSession,
    GetSessionService,
    {
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
    },
    {
      provide: 'ValidateTokenRepository',
      useClass: ValidateTokenRepositoryImpl,
    },
    {
      provide: 'GetSessionRepository',
      useClass: GetSessionRepositoryImpl,
    },
    {
      provide: 'JwtService',
      useClass: JwtService,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class GetSessionModule {}
