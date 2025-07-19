import { Module } from '@nestjs/common';
import { EditShotService } from './edit-shot.service';
import { EditShotController } from './edit-shot.controller';
import {
  FindShotModelByIdRepositoryImpl,
  FindShotByTitleRepositoryImpl,
  FindUserInShotRepositoryImpl,
  EditShotRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { EditShot, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EditShotController],
  providers: [
    ValidateToken,
    EditShot,
    EditShotService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'EditShotRepository',
      useClass: EditShotRepositoryImpl,
    },
    {
      provide: 'FindUserInShotRepository',
      useClass: FindUserInShotRepositoryImpl,
    },
    {
      provide: 'FindShotByTitleRepository',
      useClass: FindShotByTitleRepositoryImpl,
    },
    {
      provide: 'FindShotModelByIdRepository',
      useClass: FindShotModelByIdRepositoryImpl,
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
export class EditShotModule {}
