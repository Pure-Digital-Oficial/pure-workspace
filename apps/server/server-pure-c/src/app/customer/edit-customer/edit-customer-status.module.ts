import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  FindCustomerByIdRepositoryImpl,
  EditCustomerStatusRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  EditCustomerStatus,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { EditCustomerStatusService } from './edit-customer-status.service';
import { EditCustomerStatusController } from './edit-customer-status.controller';

@Module({
  controllers: [EditCustomerStatusController],
  providers: [
    EditCustomerStatus,
    EditCustomerStatusService,
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
      provide: 'EditCustomerStatusRepository',
      useClass: EditCustomerStatusRepositoryImpl,
    },
    {
      provide: 'FindCustomerByIdRepository',
      useClass: FindCustomerByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class EditCustomerStatusModule {}
