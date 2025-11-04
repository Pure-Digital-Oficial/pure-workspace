import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  EditTransactionRepositoryImpl,
  FindCategoryTransactionByIdRepositoryImpl,
  FindTransactionByIdRepositoryImpl,
  FindTransactionByNameAndValueRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  EditTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { EditTransactionService } from './edit-transaction.service';
import { EditTransactionController } from './edit-transaction.controller';

@Module({
  controllers: [EditTransactionController],
  providers: [
    EditTransactionService,
    EditTransaction,
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
      provide: 'EditTransactionRepository',
      useClass: EditTransactionRepositoryImpl,
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
      provide: 'FindTransactionByIdRepository',
      useClass: FindTransactionByIdRepositoryImpl,
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
export class EditTransactionModule {}
