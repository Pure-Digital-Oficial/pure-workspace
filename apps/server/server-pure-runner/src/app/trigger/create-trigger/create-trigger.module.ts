import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateTriggerRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateTrigger, ValidateToken } from '@pure-workspace/domain';
import { CreateTriggerService } from './create-trigger.service';
import { CreateTriggerController } from './create-trigger.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CreateTriggerController],
  providers: [
    ValidateToken,
    CreateTrigger,
    CreateTriggerService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'CreateTriggerRepository',
      useClass: CreateTriggerRepositoryImpl,
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
export class CreateTriggerModule {}
