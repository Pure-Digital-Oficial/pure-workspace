import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateUniqueTargetRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindTriggerByIdRepositoryImpl,
  FindTargetByContentRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateTargets, ValidateToken } from '@pure-workspace/domain';
import { CreateTargetsService } from './create-targets.service';
import { CreateTargetsController } from './create-targets.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CreateTargetsController],
  providers: [
    ValidateToken,
    CreateTargets,
    CreateTargetsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindTriggerByIdRepository',
      useClass: FindTriggerByIdRepositoryImpl,
    },
    {
      provide: 'CreateUniqueTargetRepository',
      useClass: CreateUniqueTargetRepositoryImpl,
    },
    {
      provide: 'FindTargetByContentRepository',
      useClass: FindTargetByContentRepositoryImpl,
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
export class CreateTargetsModule {}
