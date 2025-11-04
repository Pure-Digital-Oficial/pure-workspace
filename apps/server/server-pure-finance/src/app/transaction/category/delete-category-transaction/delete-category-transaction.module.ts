import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  DeleteCategoryTransactionRepositoryImpl,
  FindCategoryTransactionByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  DeleteCategoryTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { DeleteCategoryTransactionService } from './delete-category-transaction.service';
import { DeleteCategoryTransactionController } from './delete-category-transaction.controller';

@Module({
  controllers: [DeleteCategoryTransactionController],
  providers: [
    DeleteCategoryTransactionService,
    DeleteCategoryTransaction,
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
      provide: 'DeleteCategoryTransactionRepository',
      useClass: DeleteCategoryTransactionRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCategoryTransactionByIdRepository',
      useClass: FindCategoryTransactionByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class DeleteCategoryTransactionModule {}
