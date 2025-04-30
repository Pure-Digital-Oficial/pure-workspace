import { Either, left, right } from '../../../bases';
import { EntityNotEmpty, EntityNotExists } from '../../../errors';
import { FindUserByIdRepository } from '../../../repositories';

export async function UserVerificationId(
  id: string,
  findUserByIdRepository: FindUserByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('User ID'));
  }

  const filteredUser = await findUserByIdRepository.find(id);

  if (Object.keys(filteredUser?.id ?? filteredUser).length < 1) {
    return left(new EntityNotExists('User'));
  }

  return right(undefined);
}
