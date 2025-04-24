import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  FindAppByIdRepositoryImpl,
  ListUsersRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListUsers } from '@pure-workspace/domain';
import { ListUsersService } from './list-users.service';
import { ListUsersController } from './list-users.controller';

@Module({
  controllers: [ListUsersController],
  providers: [
    ListUsers,
    ListUsersService,
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
