import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  EditCategoryTransactionRepositoryImpl,
  FindCategoryTransactionByIdRepositoryImpl,
  FindCategoryTransactionByNameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  EditCategoryTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { EditCategoryTransactionService } from './edit-category-transaction.service';
import { EditCategoryTransactionController } from './edit-category-transaction.controller';

@Module({
  controllers: [EditCategoryTransactionController],
  providers: [
    EditCategoryTransactionService,
    EditCategoryTransaction,
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
      provide: 'EditCategoryTransactionRepository',
      useClass: EditCategoryTransactionRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindCategoryTransactionByNameRepository',
      useClass: FindCategoryTransactionByNameRepositoryImpl,
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
export class EditCategoryTransactionModule {}
