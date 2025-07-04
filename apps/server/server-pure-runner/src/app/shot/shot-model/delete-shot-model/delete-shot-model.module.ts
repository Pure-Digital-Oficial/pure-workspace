import { Module } from '@nestjs/common';
import { DeleteShotModelService } from './delete-shot-model.service';
import { DeleteShotModelController } from './delete-shot-model.controller';
import {
  DeleteShotModelRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInShotModelRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { DeleteShotModel, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeleteShotModelController],
  providers: [
    ValidateToken,
    DeleteShotModel,
    DeleteShotModelService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInShotModelRepository',
      useClass: FindUserInShotModelRepositoryImpl,
    },
    {
      provide: 'DeleteShotModelRepository',
      useClass: DeleteShotModelRepositoryImpl,
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
export class DeleteShotModelModule {}
