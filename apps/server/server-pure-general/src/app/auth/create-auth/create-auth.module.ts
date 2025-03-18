import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateAuthRepositoryImpl,
  FindUserByEmailRepositoryImpl,
  FindUserByIdRepositoryImpl,
  HashGeneratorRepositoryImpl,
  FindAuthByUserIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateAuth } from '@pure-workspace/domain';
import { CreateAuthService } from './create-auth.service';
import { CreateAuthController } from './create-auth.controller';

@Module({
  controllers: [CreateAuthController],
  providers: [
    CreateAuth,
    CreateAuthService,
    {
      provide: 'CreateAuthRepository',
      useClass: CreateAuthRepositoryImpl,
    },
    {
      provide: 'FindUserByEmailRepository',
      useClass: FindUserByEmailRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindAuthByUserIdRepository',
      useClass: FindAuthByUserIdRepositoryImpl,
    },
    {
      provide: 'HashGeneratorRepository',
      useClass: HashGeneratorRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateAuthModule {}
