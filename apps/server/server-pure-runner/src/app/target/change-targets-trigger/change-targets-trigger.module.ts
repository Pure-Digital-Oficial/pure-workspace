import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  ChangeTargetTriggerRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindTriggerByIdRepositoryImpl,
  FindUserInTargetRepositoryImpl,
} from '@pure-workspace/data-access';
import { ChangeTargetsTrigger, ValidateToken } from '@pure-workspace/domain';
import { ChangeTargetsTriggerService } from './change-targets-trigger.service';
import { ChangeTargetsTriggerController } from './change-targets-trigger.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChangeTargetsTriggerController],
  providers: [
    ValidateToken,
    ChangeTargetsTrigger,
    ChangeTargetsTriggerService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindTriggerByIdRepository',
      useClass: FindTriggerByIdRepositoryImpl,
    },
    {
      provide: 'ChangeTargetTriggerRepository',
      useClass: ChangeTargetTriggerRepositoryImpl,
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
export class ChangeTargetsTriggerModule {}
