import { UserType } from '../../../types';

const validUserTypes: UserType[] = [
  'DEFAULT',
  'DEFAULT_ADMIN',
  'ADMIN',
  'SYSTEM',
];

export function UserVerificationType(value: UserType) {
  return validUserTypes.includes(value);
}
