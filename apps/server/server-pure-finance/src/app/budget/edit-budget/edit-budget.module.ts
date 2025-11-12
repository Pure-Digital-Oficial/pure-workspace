import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  EditBudgetRepositoryImpl,
  FindBudgetByIdRepositoryImpl,
  FindBudgetByNameRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  EditBudget,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { EditBudgetService } from './edit-budget.service';
import { EditBudgetController } from './edit-budget.controller';

@Module({
  controllers: [EditBudgetController],
  providers: [
    EditBudgetService,
    EditBudget,
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
      provide: 'EditBudgetRepository',
      useClass: EditBudgetRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindBudgetByIdRepository',
      useClass: FindBudgetByIdRepositoryImpl,
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
export class EditBudgetModule {}
