import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  ListTransactionsRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListTransactions, ValidateToken } from '@pure-workspace/domain';
import { ListTransactionsController } from './list-transactions.controller';
import { ListTransactionsService } from './list-transactions.service';

@Module({
  controllers: [ListTransactionsController],
  providers: [
    ValidateToken,
    ListTransactions,
    ListTransactionsService,
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
