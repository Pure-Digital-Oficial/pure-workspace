import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindUserInShotRepositoryImpl,
  FindUserInTargetRepositoryImpl,
  RegisterHistoryShotRepositoryImpl,
} from '@pure-workspace/data-access';
import { RegisterHistoryShots, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';
import { RegisterHistoryShotsController } from './register-history-shots.controller';
import { RegisterHistoryShotsService } from './register-history-shots.service';

@Module({
  controllers: [RegisterHistoryShotsController],
  providers: [
    ValidateToken,
    RegisterHistoryShots,
    RegisterHistoryShotsService,
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
export class RegisterHistoryShotsModule {}
