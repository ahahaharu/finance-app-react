import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_TRANSACTION = {
  id: null,
  amount: 0,
  currency: '',
  type: '',
  date: new Date(),
  category: '',
  account: '',
  comment: '',
};

export function createTransaction(data) {
  return {
    ...DEFAULT_TRANSACTION,
    ...data,
    id: uuidv4(),
    amount: parseFloat(data.amount),
    date: new Date(data.date),
  };
}
