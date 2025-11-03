import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  CreateCategoryTransactionRepositoryImpl,
  FindCategoryTransactionByNameRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  CreateCategoryTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreateCategoryTransactionService } from './create-category-transaction.service';
import { CreateCategoryTransactionController } from './create-category-transaction.controller';

@Module({
  controllers: [CreateCategoryTransactionController],
  providers: [
    CreateCategoryTransaction,
    CreateCategoryTransactionService,
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
      provide: 'CreateCategoryTransactionRepository',
      useClass: CreateCategoryTransactionRepositoryImpl,
    },
    {
      provide: 'FindCategoryTransactionByNameRepository',
      useClass: FindCategoryTransactionByNameRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateCategoryTransactionModule {}
