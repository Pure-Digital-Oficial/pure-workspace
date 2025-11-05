import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  PrismaGeneralService,
  FindUserByIdRepositoryImpl,
  ValidateTokenRepositoryImpl,
  JwtAdminGuard,
  FindFixedGainByNameAndValueRepositoryImpl,
  CreateFixedGainRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  CreateFixedGain,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { CreateFixedGainController } from './create-fixed-gain.controller';
import { CreateFixedGainService } from './create-fixed-gain.service';

@Module({
  controllers: [CreateFixedGainController],
  providers: [
    CreateFixedGain,
    CreateFixedGainService,
    ValidateToken,
    ValidateAdmin,
    {
      provide: JwtAdminGuard,
      useFactory: (
        validateAdmin: ValidateAdmin,
        validateToken: ValidateToken
      ) => new JwtAdminGuard(validateAdmin, validateToken),
      inject: [ValidateAdmin, ValidateToken],
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
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
      provide: 'CreateFixedGainRepository',
      useClass: CreateFixedGainRepositoryImpl,
    },
    {
      provide: 'FindFixedGainByNameAndValueRepository',
      useClass: FindFixedGainByNameAndValueRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class CreateFixedGainModule {}
