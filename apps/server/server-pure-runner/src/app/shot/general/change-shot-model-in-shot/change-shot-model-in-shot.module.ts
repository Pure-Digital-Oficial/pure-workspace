import { Module } from '@nestjs/common';
import { ChangeShotModelInShotService } from './change-shot-model-in-shot.service';
import { ChangeShotModelInShotController } from './change-shot-model-in-shot.controller';
import {
  FindShotModelByIdRepositoryImpl,
  FindShotByTitleRepositoryImpl,
  FindUserInShotRepositoryImpl,
  ChangeShotModelInShotRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { ChangeShotModelInShot, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChangeShotModelInShotController],
  providers: [
    ValidateToken,
    ChangeShotModelInShot,
    ChangeShotModelInShotService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ChangeShotModelInShotRepository',
      useClass: ChangeShotModelInShotRepositoryImpl,
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
export class ChangeShotModelInShotModule {}
