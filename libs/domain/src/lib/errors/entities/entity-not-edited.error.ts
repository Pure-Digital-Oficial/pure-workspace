import { UseCaseError } from '../../bases';

export class EntityNotEdited extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} not edited in the system`);
    this.name = 'EntityNotEdited';
  }
}
