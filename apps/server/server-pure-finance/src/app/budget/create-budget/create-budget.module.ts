import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  FindBudgetByNameRepositoryImpl,
  CreateBudgetRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  CreateBudget,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreateBudgetService } from './create-budget.service';
import { CreateBudgetController } from './create-budget.controller';

@Module({
  controllers: [CreateBudgetController],
  providers: [
    CreateBudget,
    CreateBudgetService,
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
      provide: 'CreateBudgetRepository',
      useClass: CreateBudgetRepositoryImpl,
    },
    {
      provide: 'FindBudgetByNameRepository',
      useClass: FindBudgetByNameRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateBudgetModule {}
