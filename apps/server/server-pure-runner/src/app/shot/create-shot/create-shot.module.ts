import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindShotByTitleRepositoryImpl,
  FindShotModelByIdRepositoryImpl,
  CreateShotRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateShot, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';
import { CreateShotController } from './create-shot.controller';
import { CreateShotService } from './create-shot.service';

@Module({
  controllers: [CreateShotController],
  providers: [
    ValidateToken,
    CreateShot,
    CreateShotService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
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
      provide: 'CreateShotRepository',
      useClass: CreateShotRepositoryImpl,
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
export class CreateShotModule {}
