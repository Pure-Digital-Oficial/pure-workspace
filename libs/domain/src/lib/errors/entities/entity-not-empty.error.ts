import { UseCaseError } from '../../bases';

export class EntityNotEmpty extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`the ${entitie} cannot be empty`);
    this.name = 'EntityNotEmpty';
  }
}
