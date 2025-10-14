import {
  ACCOUNTS_ICONS,
  TRANSACTION_ICONS,
} from '../constants/transactionsConstants';

export const getIconComponent = (iconName) => {
  return TRANSACTION_ICONS[iconName];
};

export const getAccountIconComponent = (iconName) => {
  return ACCOUNTS_ICONS[iconName];
};
