import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  ListShotModelsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListShotModels, ValidateToken } from '@pure-workspace/domain';
import { ListShotModelsService } from './list-shot-models.service';
import { ListShotModelsController } from './list-shot-models.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ListShotModelsController],
  providers: [
    ValidateToken,
    ListShotModels,
    ListShotModelsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListShotModelsRepository',
      useClass: ListShotModelsRepositoryImpl,
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
export class ListShotModelsModule {}
