import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateAuthRepositoryImpl,
  FindUserByEmailRepositoryImpl,
  FindAppByIdRepositoryImpl,
  FindUserInAppRepositoryImpl,
  ValidatePasswordRepositoryImpl,
  SignInRepositoryImpl,
} from '@pure-workspace/data-access';
import { Auth } from '@pure-workspace/domain';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    Auth,
    AuthService,
    {
      provide: 'CreateAuthRepository',
      useClass: CreateAuthRepositoryImpl,
    },
    {
      provide: 'FindUserByEmailRepository',
      useClass: FindUserByEmailRepositoryImpl,
    },
    {
      provide: 'FindAppByIdRepository',
      useClass: FindAppByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInAppRepository',
      useClass: FindUserInAppRepositoryImpl,
    },
    {
      provide: 'ValidatePasswordRepository',
      useClass: ValidatePasswordRepositoryImpl,
    },
    {
      provide: 'SignInRepository',
      useClass: SignInRepositoryImpl,
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
export class AuthModule {}
