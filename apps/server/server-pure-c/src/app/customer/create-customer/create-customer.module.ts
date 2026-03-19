import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  CreateCustomerRepositoryImpl,
  FindCustomerByExternalIdRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  CreateCustomer,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreateCustomerService } from './create-customer.service';
import { CreateCustomerController } from './create-customer.controller';

@Module({
  controllers: [CreateCustomerController],
  providers: [
    CreateCustomer,
    CreateCustomerService,
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
      provide: 'CreateCustomerRepository',
      useClass: CreateCustomerRepositoryImpl,
    },
    {
      provide: 'FindCustomerByExternalIdRepository',
      useClass: FindCustomerByExternalIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateCustomerModule {}
