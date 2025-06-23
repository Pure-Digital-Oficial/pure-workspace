import { Module } from '@nestjs/common';
import { EditTriggerService } from './edit-trigger.service';
import { EditTriggerController } from './edit-trigger.controller';
import {
  EditTriggerRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInTriggerRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { EditTrigger, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EditTriggerController],
  providers: [
    ValidateToken,
    EditTrigger,
    EditTriggerService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'EditTriggerRepository',
      useClass: EditTriggerRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInTriggerRepository',
      useClass: FindUserInTriggerRepositoryImpl,
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
export class EditTriggerModule {}
