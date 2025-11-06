import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  ListFixedGainsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ListFixedGains,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListFixedGainsService } from './list-fixed-gains.service';
import { ListFixedGainsController } from './list-fixed-gains.controller';

@Module({
  controllers: [ListFixedGainsController],
  providers: [
    ListFixedGains,
    ListFixedGainsService,
    ValidateToken,
    ValidateAdmin,
    {
      provide: JwtAdminGuard,
      useFactory: (
        validateAdmin: ValidateAdmin,
        validateToken: ValidateToken
      ) => new JwtAdminGuard(validateAdmin, validateToken),
      inject: [ValidateAdmin, ValidateToken],
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
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListFixedGainsRepository',
      useClass: ListFixedGainsRepositoryImpl,
    },
    {
      provide: 'ValidateTokenRepository',
      useClass: ValidateTokenRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class ListFixedGainsModule {}
