import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_EXPENSE = {
  id: null,
  description: '',
  amount: 0,
  date: new Date(),
  category: '',
  account: '',
  iconName: '',
  color: '',
};

export function createExpense(data) {
  return {
    ...DEFAULT_EXPENSE,
    ...data,
    id: uuidv4(),
    amount: parseFloat(data.amount),
    date: new Date(data.date),
  };
}
