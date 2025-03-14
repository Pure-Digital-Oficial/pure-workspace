import { UseCaseError } from '../../bases';

export class EntityAlreadyExists extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} already exists in the system`);
    this.name = 'EntityAlreadyExists';
  }
}
