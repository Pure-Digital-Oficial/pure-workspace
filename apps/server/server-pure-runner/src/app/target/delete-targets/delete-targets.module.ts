import { Module } from '@nestjs/common';
import { DeleteTargetsService } from './delete-targets.service';
import { DeleteTargetsController } from './delete-targets.controller';
import {
  DeleteTargetRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInTargetRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { DeleteTargets, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeleteTargetsController],
  providers: [
    ValidateToken,
    DeleteTargets,
    DeleteTargetsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInTargetRepository',
      useClass: FindUserInTargetRepositoryImpl,
    },
    {
      provide: 'DeleteTargetRepository',
      useClass: DeleteTargetRepositoryImpl,
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
export class DeleteTargetsModule {}
