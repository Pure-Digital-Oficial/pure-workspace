import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  ListTransactionsRepositoryImpl,
  JwtAdminGuard,
} from '@pure-workspace/data-access';
import {
  ListTransactions,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListTransactionsController } from './list-transactions.controller';
import { ListTransactionsService } from './list-transactions.service';

@Module({
  controllers: [ListTransactionsController],
  providers: [
    ValidateToken,
    ListTransactions,
    ListTransactionsService,
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
      provide: 'ListTransactionsRepository',
      useClass: ListTransactionsRepositoryImpl,
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
export class ListTransactionsModule {}
