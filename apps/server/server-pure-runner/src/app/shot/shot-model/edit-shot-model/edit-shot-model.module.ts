import { Module } from '@nestjs/common';
import { EditShotModelService } from './edit-shot-model.service';
import { EditShotModelController } from './edit-shot-model.controller';
import {
  FindShotModelBySubjectRepositoryImpl,
  FindShotModelByTitleRepositoryImpl,
  FindUserInShotModelRepositoryImpl,
  EditShotModelRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { EditShotModel, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EditShotModelController],
  providers: [
    ValidateToken,
    EditShotModel,
    EditShotModelService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'EditShotModelRepository',
      useClass: EditShotModelRepositoryImpl,
    },
    {
      provide: 'FindUserInShotModelRepository',
      useClass: FindUserInShotModelRepositoryImpl,
    },
    {
      provide: 'FindShotModelByTitleRepository',
      useClass: FindShotModelByTitleRepositoryImpl,
    },
    {
      provide: 'FindShotModelBySubjectRepository',
      useClass: FindShotModelBySubjectRepositoryImpl,
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
export class EditShotModelModule {}
