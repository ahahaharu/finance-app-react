import { EXPENSE_ICONS } from '../constants/expenceConstants';

export const getIconComponent = (iconName) => {
  return EXPENSE_ICONS[iconName] || EXPENSE_ICONS.Wallet;
};

export const getCategoryByName = (categoryName) => {
  return CATEGORIES.find((category) => category.name === categoryName);
};

export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
