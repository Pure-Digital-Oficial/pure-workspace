import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  ListShotsRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListShots, ValidateToken } from '@pure-workspace/domain';
import { ListShotsService } from './list-shots.service';
import { ListShotsController } from './list-shots.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ListShotsController],
  providers: [
    ValidateToken,
    ListShots,
    ListShotsService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListShotsRepository',
      useClass: ListShotsRepositoryImpl,
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
export class ListShotsModule {}
