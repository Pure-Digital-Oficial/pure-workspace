import { Module } from '@nestjs/common';
import {
  ChangeUserTypeRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ChangeUserType,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ChangeUserTypeController } from './change-user-type.controller';
import { ChangeUserTypeService } from './change-user-type.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ChangeUserTypeController],
  providers: [
    ChangeUserType,
    ChangeUserTypeService,
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
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ChangeUserTypeRepository',
      useClass: ChangeUserTypeRepositoryImpl,
    },
  ],
})
export class ChangeUserTypeModule {}
