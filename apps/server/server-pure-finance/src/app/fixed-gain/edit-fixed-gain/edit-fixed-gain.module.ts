import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  EditFixedGainRepositoryImpl,
  FindFixedGainByIdRepositoryImpl,
  FindFixedGainByNameAndValueRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  EditFixedGain,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { EditFixedGainService } from './edit-fixed-gain.service';
import { EditFixedGainController } from './edit-fixed-gain.controller';

@Module({
  controllers: [EditFixedGainController],
  providers: [
    EditFixedGainService,
    EditFixedGain,
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
      provide: 'EditFixedGainRepository',
      useClass: EditFixedGainRepositoryImpl,
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
      provide: 'FindFixedGainByNameAndValueRepository',
      useClass: FindFixedGainByNameAndValueRepositoryImpl,
    },
    {
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
  ],
})
export class EditFixedGainModule {}
