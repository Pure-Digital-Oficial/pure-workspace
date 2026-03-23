import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  ListPaymentMethodsRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ListPaymentMethods,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListPaymentMethodsService } from './list-payment-methods.service';
import { ListPaymentMethodsController } from './list-payment-methods.controller';

@Module({
  controllers: [ListPaymentMethodsController],
  providers: [
    ListPaymentMethods,
    ListPaymentMethodsService,
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
      provide: 'ListPaymentMethodsRepository',
      useClass: ListPaymentMethodsRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class ListPaymentMethodsModule {}
