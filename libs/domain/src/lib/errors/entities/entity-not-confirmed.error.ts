import { UseCaseError } from '../../bases';

export class EntityNotConfirmed extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} was not confirmed in the system`);
    this.name = 'EntityNotConfirmed';
  }
}
