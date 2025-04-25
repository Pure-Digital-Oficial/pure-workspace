import { Module } from '@nestjs/common';
import { EditUserService } from './edit-user.service';
import { EditUserController } from './edit-user.controller';
import {
  EditUserRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { EditUser } from '@pure-workspace/domain';

@Module({
  controllers: [EditUserController],
  providers: [
    EditUserService,
    EditUser,
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
