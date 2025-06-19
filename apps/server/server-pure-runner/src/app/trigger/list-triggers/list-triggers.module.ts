import { Module } from '@nestjs/common';
import {
  PrismaGeneralService,
  ListTriggersRepositoryImpl,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { ListTriggers, ValidateToken } from '@pure-workspace/domain';
import { ListTriggersService } from './list-triggers.service';
import { ListTriggersController } from './list-triggers.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ListTriggersController],
  providers: [
    ValidateToken,
    ListTriggers,
    ListTriggersService,
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'ListTriggersRepository',
      useClass: ListTriggersRepositoryImpl,
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
export class ListTriggersModule {}
