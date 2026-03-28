import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  FindCustomerByIdRepositoryImpl,
  FindPaymentHistoryByCustomerIdRepositoryImpl,
  ConfirmManualPaymentRepositoryImpl,
  FindPaymentPlataformByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ConfirmManualPayment,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ConfirmManualPaymentService } from './confirm-manual-payment.service';
import { ConfirmManualPaymentController } from './confirm-manual-payment.controller';

@Module({
  controllers: [ConfirmManualPaymentController],
  providers: [
    ConfirmManualPayment,
    ConfirmManualPaymentService,
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
      provide: 'ConfirmManualPaymentRepository',
      useClass: ConfirmManualPaymentRepositoryImpl,
    },
    {
      provide: 'FindCustomerByIdRepository',
      useClass: FindCustomerByIdRepositoryImpl,
    },
    {
      provide: 'FindPaymentHistoryByCustomerIdRepository',
      useClass: FindPaymentHistoryByCustomerIdRepositoryImpl,
    },
    {
      provide: 'FindPaymentPlataformByIdRepository',
      useClass: FindPaymentPlataformByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class ConfirmManualPaymentModule {}
