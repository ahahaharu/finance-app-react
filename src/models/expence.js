import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_EXPENSE = {
  id: null,
  amount: 0,
  currency: '',
  date: new Date(),
  category: '',
  account: '',
  comment: '',
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
