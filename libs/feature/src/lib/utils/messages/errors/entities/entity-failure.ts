import { Langue } from '@pure-workspace/domain';

export const entityFailureMessage = (action: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `Failure to ${action}`;
      break;
    default:
      message = `Falha ao ${action}`;
      break;
  }

  return message;
};
