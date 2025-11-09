import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  DeleteFixedGainRepositoryImpl,
  FindFixedGainByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  DeleteFixedGain,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { DeleteFixedGainService } from './delete-fixed-gain.service';
import { DeleteFixedGainController } from './delete-fixed-gain.controller';

@Module({
  controllers: [DeleteFixedGainController],
  providers: [
    DeleteFixedGainService,
    DeleteFixedGain,
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
      provide: 'ValidateTokenRepository',
      useClass: ValidateTokenRepositoryImpl,
    },
    {
      provide: 'JwtService',
      useClass: JwtService,
    },
    {
      provide: 'DeleteFixedGainRepository',
      useClass: DeleteFixedGainRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindFixedGainByIdRepository',
      useClass: FindFixedGainByIdRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class DeleteFixedGainModule {}
