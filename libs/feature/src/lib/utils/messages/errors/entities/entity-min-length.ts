import { EntityComparationResponseDto, Langue } from '@pure-workspace/domain';

export const EntityMinLength = (
  input: EntityComparationResponseDto,
  langue: Langue
) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input.entity} must have at least ${input.comparation} characters!`;
      break;
    default:
      message = `A(o) ${input.entity} deve ter no mínimo ${input.comparation} caracteres!`;
      break;
  }

  return message;
};
