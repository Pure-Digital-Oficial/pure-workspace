import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  ListTotalTransactionsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ListTotalTransactions,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListTotalTransactionsController } from './list-total-transactions.controller';
import { ListTotalTransactionsService } from './list-total-transactions.service';

@Module({
  controllers: [ListTotalTransactionsController],
  providers: [
    ListTotalTransactions,
    ListTotalTransactionsService,
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
      provide: 'ListTotalTransactionsRepository',
      useClass: ListTotalTransactionsRepositoryImpl,
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
export class ListTotalTransactionsModule {}
