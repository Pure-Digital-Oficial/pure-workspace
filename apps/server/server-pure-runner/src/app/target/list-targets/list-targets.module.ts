import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  ListTargetsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindTriggerByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListTargets, ValidateToken } from '@pure-workspace/domain';
import { ListTargetsService } from './list-targets.service';
import { ListTargetsController } from './list-targets.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ListTargetsController],
  providers: [
    ValidateToken,
    ListTargets,
    ListTargetsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindTriggerByIdRepository',
      useClass: FindTriggerByIdRepositoryImpl,
    },
    {
      provide: 'ListTargetsRepository',
      useClass: ListTargetsRepositoryImpl,
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
export class ListTargetsModule {}
