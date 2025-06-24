import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateUniqueTargetRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindTriggerByIdRepositoryImpl,
  FindTargetByContentRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateUniqueTarget, ValidateToken } from '@pure-workspace/domain';
import { CreateUniqueTargetService } from './create-unique-target.service';
import { CreateUniqueTargetController } from './create-unique-target.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CreateUniqueTargetController],
  providers: [
    ValidateToken,
    CreateUniqueTarget,
    CreateUniqueTargetService,
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
export class CreateUniqueTargetModule {}
