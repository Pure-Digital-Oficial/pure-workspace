import { Module } from '@nestjs/common';
import {
  EditUserProfileRepositoryImpl,
  FindUserByEmailRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import { EditUserProfile, ValidateToken } from '@pure-workspace/domain';
import { EditUserProfileController } from './edit-user-profile.controller';
import { EditUserProfileService } from './edit-user-profile.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [EditUserProfileController],
  providers: [
    EditUserProfileService,
    EditUserProfile,
    ValidateToken,
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
    {
      provide: 'EditUserProfileRepository',
      useClass: EditUserProfileRepositoryImpl,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'FindUserByEmailRepository',
      useClass: FindUserByEmailRepositoryImpl,
    },
  ],
})
export class EditUserProfileModule {}
