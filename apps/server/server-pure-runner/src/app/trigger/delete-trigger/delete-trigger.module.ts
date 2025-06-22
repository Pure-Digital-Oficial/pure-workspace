import { Module } from '@nestjs/common';
import { DeleteTriggerService } from './delete-trigger.service';
import { DeleteTriggerController } from './delete-trigger.controller';
import {
  DeleteTriggerRepositoryImpl,
  FindUserByIdRepositoryImpl,
  FindUserInTriggerRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { DeleteTrigger, ValidateToken } from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeleteTriggerController],
  providers: [
    ValidateToken,
    DeleteTrigger,
    DeleteTriggerService,

    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserInTriggerRepository',
      useClass: FindUserInTriggerRepositoryImpl,
    },
    {
      provide: 'DeleteTriggerRepository',
      useClass: DeleteTriggerRepositoryImpl,
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
export class DeleteTriggerModule {}
