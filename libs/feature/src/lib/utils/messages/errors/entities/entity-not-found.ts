import { Langue } from '@pure-workspace/domain';

export const entityNotFoundMessage = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${entity} not found in the system`;
      break;
    default:
      message = `O(a) ${entity} não foi Encontrado no Sistema!`;
      break;
  }

  return message;
};
