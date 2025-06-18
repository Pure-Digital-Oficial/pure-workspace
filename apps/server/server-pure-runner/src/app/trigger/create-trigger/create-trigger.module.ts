import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  CreateTriggerRepositoryImpl,
  FindUserByIdRepositoryImpl,
} from '@pure-workspace/data-access';
import { CreateTrigger } from '@pure-workspace/domain';
import { CreateTriggerService } from './create-trigger.service';
import { CreateTriggerController } from './create-trigger.controller';

@Module({
  controllers: [CreateTriggerController],
  providers: [
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
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateTriggerModule {}
