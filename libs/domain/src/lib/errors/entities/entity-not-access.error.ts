import { UseCaseError } from '../../bases';

export class EntityNotAccess extends Error implements UseCaseError {
  constructor(entitie: string) {
    super(`The ${entitie} does't have access`);
    this.name = 'EntityNotAccess';
  }
}
