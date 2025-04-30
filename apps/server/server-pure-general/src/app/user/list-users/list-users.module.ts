import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindAppByIdRepositoryImpl,
  ListUsersRepositoryImpl,
  JwtAdminGuard,
  ValidateTokenRepositoryImpl,
  FindUserByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  ListUsers,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { ListUsersService } from './list-users.service';
import { ListUsersController } from './list-users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ListUsersController],
  providers: [
    ListUsers,
    ListUsersService,
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
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
    },
    {
      provide: 'ListUsersRepository',
      useClass: ListUsersRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class ListUsersModule {}
