import { Module } from '@nestjs/common';
import { EditUserService } from './edit-user.service';
import { EditUserController } from './edit-user.controller';
import {
  EditUserRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { EditUser, ValidateAdmin, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EditUserController],
  providers: [
    EditUserService,
    EditUser,
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
      provide: 'EditUserRepository',
      useClass: EditUserRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
  ],
})
export class EditUserModule {}
