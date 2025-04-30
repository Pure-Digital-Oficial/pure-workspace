import { Module } from '@nestjs/common';
import {
  EditUserProfileRepositoryImpl,
  FindUserByEmailRepositoryImpl,
  FindUserByIdRepositoryImpl,
  PrismaGeneralService,
} from '@pure-workspace/data-access';
import { EditUserProfile } from '@pure-workspace/domain';
import { EditUserProfileController } from './edit-user-profile.controller';
import { EditUserProfileService } from './edit-user-profile.service';

@Module({
  controllers: [EditUserProfileController],
  providers: [
    EditUserProfileService,
    EditUserProfile,
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
