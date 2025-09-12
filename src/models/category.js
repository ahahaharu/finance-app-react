import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_CATEGORY = {
  id: null,
  name: '',
  iconName: '',
  color: '',
};

export function createCategory(data) {
  return {
    ...DEFAULT_CATEGORY,
    ...data,
    id: uuidv4(),
  };
}
