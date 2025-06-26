import { Module } from '@nestjs/common';
import { DeleteUserByIdService } from './delete-user-by-id.service';
import { DeleteUserByIdController } from './delete-user-by-id.controller';
import {
  DeleteUserByIdRepositoryImpl,
  FindUserByIdRepositoryImpl,
  JwtAdminGuard,
  PrismaGeneralService,
  ValidateTokenRepositoryImpl,
} from '@pure-workspace/data-access';
import {
  DeleteUserById,
  ValidateAdmin,
  ValidateToken,
} from '@pure-workspace/domain';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DeleteUserByIdController],
  providers: [
    DeleteUserById,
    DeleteUserByIdService,
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
      provide: 'PrismaService',
      useClass: PrismaGeneralService,
    },
    {
      provide: 'FindUserByIdRepository',
      useClass: FindUserByIdRepositoryImpl,
    },
    {
      provide: 'DeleteUserByIdRepository',
      useClass: DeleteUserByIdRepositoryImpl,
    },
  ],
})
export class DeleteUserByIdModule {}
