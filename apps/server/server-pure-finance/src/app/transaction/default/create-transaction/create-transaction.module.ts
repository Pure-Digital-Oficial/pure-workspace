import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  FindTransactionByNameAndValueRepositoryImpl,
  CreateTransactionRepositoryImpl,
  FindCategoryTransactionByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
} from '@pure-workspace/data-access';
import {
  CreateTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreateTransactionService } from './create-transaction.service';
import { CreateTransactionController } from './create-transaction.controller';

@Module({
  controllers: [CreateTransactionController],
  providers: [
    CreateTransaction,
    CreateTransactionService,
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
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
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
      provide: 'CreateTransactionRepository',
      useClass: CreateTransactionRepositoryImpl,
    },
    {
      provide: 'FindCategoryTransactionByIdRepository',
      useClass: FindCategoryTransactionByIdRepositoryImpl,
    },
    {
      provide: 'FindTransactionByNameAndValueRepository',
      useClass: FindTransactionByNameAndValueRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateTransactionModule {}
