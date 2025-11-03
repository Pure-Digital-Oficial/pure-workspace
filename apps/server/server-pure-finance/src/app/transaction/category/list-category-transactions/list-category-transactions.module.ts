import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  ListCategoryTransactionsRepositoryImpl,
  JwtAdminGuard,
} from '@pure-workspace/data-access';
import {
  ListCategoryTransactions,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListCategoryTransactionsController } from './list-category-transactions.controller';
import { ListCategoryTransactionsService } from './list-category-transactions.service';

@Module({
  controllers: [ListCategoryTransactionsController],
  providers: [
    ListCategoryTransactions,
    ListCategoryTransactionsService,
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
      provide: 'ListCategoryTransactionsRepository',
      useClass: ListCategoryTransactionsRepositoryImpl,
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
export class ListCategoryTransactionsModule {}
