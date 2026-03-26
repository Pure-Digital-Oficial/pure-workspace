import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  FindPaymentPlataformByIdRepositoryImpl,
  GeneratePaymentRepositoryImpl,
  FindPaymentMethodWithPlataformByIdsRepositoryImpl,
  FindPaymentMethodByIdRepositoryImpl,
  FindPlanByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  GeneratePayment,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { GeneratePaymentService } from './generate-payment.service';
import { GeneratePaymentController } from './generate-payment.controller';

@Module({
  controllers: [GeneratePaymentController],
  providers: [
    GeneratePayment,
    GeneratePaymentService,
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
      provide: 'GeneratePaymentRepository',
      useClass: GeneratePaymentRepositoryImpl,
    },
    {
      provide: 'FindPaymentPlataformByIdRepository',
      useClass: FindPaymentPlataformByIdRepositoryImpl,
    },
    {
      provide: 'FindPaymentMethodByIdRepository',
      useClass: FindPaymentMethodByIdRepositoryImpl,
    },
    {
      provide: 'FindPlanByIdRepository',
      useClass: FindPlanByIdRepositoryImpl,
    },
    {
      provide: 'FindPaymentMethodWithPlataformByIdsRepository',
      useClass: FindPaymentMethodWithPlataformByIdsRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class GeneratePaymentModule {}
