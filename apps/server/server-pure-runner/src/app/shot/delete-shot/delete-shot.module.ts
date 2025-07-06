import { Module } from '@nestjs/common';
import { DeleteShotService } from './delete-shot.service';
import { DeleteShotController } from './delete-shot.controller';
import {
  DeleteShotRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInShotRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { DeleteShot, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeleteShotController],
  providers: [
    ValidateToken,
    DeleteShot,
    DeleteShotService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInShotRepository',
      useClass: FindUserInShotRepositoryImpl,
    },
    {
      provide: 'DeleteShotRepository',
      useClass: DeleteShotRepositoryImpl,
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
export class DeleteShotModule {}
