import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  DeleteTransactionRepositoryImpl,
  FindTransactionByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  DeleteTransaction,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { DeleteTransactionService } from './delete-transaction.service';
import { DeleteTransactionController } from './delete-transaction.controller';

@Module({
  controllers: [DeleteTransactionController],
  providers: [
    DeleteTransactionService,
    DeleteTransaction,
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
      provide: 'DeleteTransactionRepository',
      useClass: DeleteTransactionRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindTransactionByIdRepository',
      useClass: FindTransactionByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class DeleteTransactionModule {}
