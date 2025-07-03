import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindShotModelByTitleRepositoryImpl,
  FindShotModelBySubjectRepositoryImpl,
  CreateShotModelRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateShotModel, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';
import { CreateShotModelController } from './create-shot-model.controller';
import { CreateShotModelService } from './create-shot-model.service';

@Module({
  controllers: [CreateShotModelController],
  providers: [
    ValidateToken,
    CreateShotModel,
    CreateShotModelService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
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
      provide: 'CreateShotModelRepository',
      useClass: CreateShotModelRepositoryImpl,
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
export class CreateShotModelModule {}
