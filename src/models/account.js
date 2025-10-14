import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_ACCOUNT = {
  id: null,
  name: '',
  icon: '',
  color: '',
};

export function createAccount(data) {
  return {
    ...DEFAULT_ACCOUNT,
    ...data,
    id: uuidv4(),
  };
}
