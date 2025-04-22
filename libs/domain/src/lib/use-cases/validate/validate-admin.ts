import { Inject } from '@nestjs/common';
import { Either, left, right, UseCase } from '../../bases';
import { EntityNotAccess, EntityNotExists } from '../../errors';
import { FindUserByIdRepository } from '../../repositories';

export class ValidateAdmin
  implements
    UseCase<string, Either<EntityNotExists | EntityNotAccess, boolean>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private readonly findUserByIdRepository: FindUserByIdRepository
  ) {}

  async execute(
    userId: string
  ): Promise<Either<EntityNotExists | EntityNotAccess, boolean>> {
    const user = await this.findUserByIdRepository.find(userId);

    if (Object.keys(user).length < 1) {
      return left(new EntityNotExists('User'));
    }

    if (user.type !== 'ADMIN') {
      return left(new EntityNotAccess('User'));
    }

    return right(true);
  }
}
