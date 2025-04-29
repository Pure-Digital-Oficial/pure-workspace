import { Either, left, right } from '../../../bases';
import { EntityNotEmpty, EntityNotExists } from '../../../errors';
import { FindAppByIdRepository } from '../../../repositories';

export async function AppVerificationId(
  id: string,
  findAppByIdRepository: FindAppByIdRepository
): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
  if (Object.keys(id).length < 1) {
    return left(new EntityNotEmpty('App ID'));
  }

  const filteredApp = await findAppByIdRepository.find(id);

  if (Object.keys(filteredApp?.id ?? filteredApp).length < 1) {
    return left(new EntityNotExists('App'));
  }

  return right(undefined);
}
