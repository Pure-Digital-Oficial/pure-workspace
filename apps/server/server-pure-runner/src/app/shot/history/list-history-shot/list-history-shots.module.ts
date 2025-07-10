import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  ListHistoryShotsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInShotRepositoryImpl,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListHistoryShots, ValidateToken } from '@pure-workspace/domain';
import { ListHistoryShotsService } from './list-history-shots.service';
import { ListHistoryShotsController } from './list-history-shots.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ListHistoryShotsController],
  providers: [
    ValidateToken,
    ListHistoryShots,
    ListHistoryShotsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInShotRepository',
      useClass: FindUserInShotRepositoryImpl,
    },
    {
      provide: 'ListHistoryShotsRepository',
      useClass: ListHistoryShotsRepositoryImpl,
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
export class ListHistoryShotsModule {}
