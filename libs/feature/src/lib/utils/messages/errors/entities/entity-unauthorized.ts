import { Langue } from '@pure-workspace/domain';

export const entityUnauthorizedMessage = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${entity} is not authorized!`;
      break;
    default:
      message = `O(a) ${entity} não está autorizada!`;
      break;
  }

  return message;
};
