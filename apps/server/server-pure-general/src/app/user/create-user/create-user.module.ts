import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateUserRepositoryImpl,
  FindAppByIdRepositoryImpl,
  FindUserByNicknameRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateUser } from '@pure-workspace/domain';
import { CreateUserService } from './create-user.service';
import { CreateUserController } from './create-user.controller';

@Module({
  controllers: [CreateUserController],
  providers: [
    CreateUser,
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
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateUserModule {}
