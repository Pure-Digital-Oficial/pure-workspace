import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindUserInShotRepositoryImpl,
  FindUserInTargetRepositoryImpl,
  RegisterHistoryShotRepositoryImpl,
} from '@pure-workspace/data-access';
import { RegisterHistoryShot, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';
import { RegisterHistoryShotController } from './register-history-shot.controller';
import { RegisterHistoryShotService } from './register-history-shot.service';

@Module({
  controllers: [RegisterHistoryShotController],
  providers: [
    ValidateToken,
    RegisterHistoryShot,
    RegisterHistoryShotService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'RegisterHistoryShotRepository',
      useClass: RegisterHistoryShotRepositoryImpl,
    },
    {
      provide: 'FindUserInShotRepository',
      useClass: FindUserInShotRepositoryImpl,
    },
    {
      provide: 'FindUserInTargetRepository',
      useClass: FindUserInTargetRepositoryImpl,
    },
    {
      provide: 'ValidateTokenRepository',
      useClass: ValidateTokenRepositoryImpl,
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
export class RegisterHistoryShotModule {}
