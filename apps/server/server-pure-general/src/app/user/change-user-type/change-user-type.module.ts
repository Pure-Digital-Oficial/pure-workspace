import { Module } from '@nestjs/common';
import {
  ChangeUserTypeRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { ChangeUserType } from '@pure-workspace/domain';
import { ChangeUserTypeController } from './change-user-type.controller';
import { ChangeUserTypeService } from './change-user-type.service';

@Module({
  controllers: [ChangeUserTypeController],
  providers: [
    ChangeUserType,
    ChangeUserTypeService,
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
