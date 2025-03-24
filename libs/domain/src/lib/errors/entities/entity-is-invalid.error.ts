import { UseCaseError } from '../../bases';

export class EntityIsInvalid extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} is not valid`);
    this.name = 'EntityIsInvalid';
  }
}
