import { Module } from '@nestjs/common';
import { EditTargetService } from './edit-target.service';
import { EditTargetController } from './edit-target.controller';
import {
  EditTargetRepositoryImpl,
  FindTriggerByIdRepositoryImpl,
  FindUserInTargetRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindTargetByContentRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { EditTarget, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EditTargetController],
  providers: [
    ValidateToken,
    EditTarget,
    EditTargetService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'EditTargetRepository',
      useClass: EditTargetRepositoryImpl,
    },
    {
      provide: 'FindTriggerByIdRepository',
      useClass: FindTriggerByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInTargetRepository',
      useClass: FindUserInTargetRepositoryImpl,
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
export class EditTargetModule {}
