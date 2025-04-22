import { Module } from '@nestjs/common';
import { CreateSystemUserController } from './create-system-user.controller';
import { CreateSystemUser, ValidateToken } from '@pure-workspace/domain';
import { CreateSystemUserService } from './create-system-user.service';
import {
  CreateSystemUserRepositoryImpl,
  FindAppByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserByNicknameRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CreateSystemUserController],
  providers: [
    CreateSystemUser,
    ValidateToken,
    CreateSystemUserService,
    {
      provide: JwtAdminGuard,
      useFactory: (
        findUserByIdRepository: FindUserByIdRepositoryImpl,
        validateToken: ValidateToken
      ) => new JwtAdminGuard(findUserByIdRepository, validateToken),
      inject: ['FindUserByIdRepository', ValidateToken],
    },
    {
      provide: 'CreateSystemUserRepository',
      useClass: CreateSystemUserRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserByNicknameRepository',
      useClass: FindUserByNicknameRepositoryImpl,
    },
    {
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
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
  ],
})
export class CreateSystemUserModule {}
