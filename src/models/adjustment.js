import { v4 as uuidv4 } from 'uuid';

export const DEFAULT_ADJUSTMENT = {
  id: null,
  amount: 0,
  currency: '',
  type: 'Adjustment',
  date: new Date(),
  account: '',
};

export function createAdjustment(data) {
  return {
    ...DEFAULT_ADJUSTMENT,
    ...data,
    id: uuidv4(),
    amount: parseFloat(data.amount),
  };
}
