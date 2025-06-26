import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateUserRepositoryImpl,
  FindAppByIdRepositoryImpl,
  FindUserByNicknameRepositoryImpl,
  ValidateTokenRepositoryImpl,
  FindUserByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateUser, ValidateToken } from '@pure-workspace/domain';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CreateUserController],
  providers: [
    CreateUser,
    ValidateToken,
    CreateUserService,
    {
      provide: 'CreateUserRepository',
      useClass: CreateUserRepositoryImpl,
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
  ],
})
export class CreateUserModule {}
