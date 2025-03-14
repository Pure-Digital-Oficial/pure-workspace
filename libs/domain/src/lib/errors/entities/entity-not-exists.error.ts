import { UseCaseError } from '../../bases';

export class EntityNotExists extends Error implements UseCaseError {
  constructor(entity: string) {
    super(`The ${entity} not exists in system.`);
    this.name = 'EntityNotExists';
  }
}
