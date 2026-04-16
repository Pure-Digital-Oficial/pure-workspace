import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  CreatePaymentHistoryRepositoryImpl,
  FindCharacterByIdRepositoryImpl,
  FindPlanByIdRepositoryImpl,
  FindPaymentHistoryByExternalIdRepositoryImpl,
  FindCustomerByExternalIdRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  CreatePaymentHistory,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreatePaymentHistoryService } from './create-payment-history.service';
import { CreatePaymentHistoryController } from './create-payment-history.controller';

@Module({
  controllers: [CreatePaymentHistoryController],
  providers: [
    CreatePaymentHistory,
    CreatePaymentHistoryService,
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
      provide: 'CreatePaymentHistoryRepository',
      useClass: CreatePaymentHistoryRepositoryImpl,
    },
    {
      provide: 'FindCharacterByIdRepository',
      useClass: FindCharacterByIdRepositoryImpl,
    },
    {
      provide: 'FindCustomerByExternalIdRepository',
      useClass: FindCustomerByExternalIdRepositoryImpl,
    },
    {
      provide: 'FindPlanByIdRepository',
      useClass: FindPlanByIdRepositoryImpl,
    },
    {
      provide: 'FindPaymentHistoryByExternalIdRepository',
      useClass: FindPaymentHistoryByExternalIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreatePaymentHistoryModule {}
