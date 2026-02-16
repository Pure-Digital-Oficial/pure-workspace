import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  ListTransactionsForGraphsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ListTransactionsForGraphs,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListTransactionsForGraphsController } from './list-transactions-for-graphs.controller';
import { ListTransactionsForGraphsService } from './list-transactions-for-graphs.service';

@Module({
  controllers: [ListTransactionsForGraphsController],
  providers: [
    ListTransactionsForGraphs,
    ListTransactionsForGraphsService,
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
      provide: 'ListTransactionsForGraphsRepository',
      useClass: ListTransactionsForGraphsRepositoryImpl,
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
export class ListTransactionsForGraphsModule {}
