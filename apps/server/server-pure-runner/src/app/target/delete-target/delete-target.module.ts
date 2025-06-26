import { Module } from '@nestjs/common';
import { DeleteTargetService } from './delete-target.service';
import { DeleteTargetController } from './delete-target.controller';
import {
  DeleteTargetRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInTargetRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { DeleteTarget, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeleteTargetController],
  providers: [
    ValidateToken,
    DeleteTarget,
    DeleteTargetService,
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
export class DeleteTargetModule {}
