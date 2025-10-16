import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_TRANSFER = {
  id: null,
  from: '',
  to: '',
  amount: 0,
  type: 'Transfer',
  currency: '',
  date: new Date(),
  comment: '',
};

export function createTransfer(data) {
  return {
    ...DEFAULT_TRANSFER,
    ...data,
    id: uuidv4(),
    amount: parseFloat(data.amount),
    date: new Date(data.date),
  };
}
