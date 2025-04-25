import { UseCaseError } from '../../bases';

export class EntityNotDeleted extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not deleted in the database`);
    this.name = 'EntityNotDeleted';
  }
}
