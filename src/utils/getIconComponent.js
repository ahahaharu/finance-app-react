import { TRANSACTION_ICONS } from '../constants/transactionsConstants';

const getIconComponent = (iconName) => {
  return TRANSACTION_ICONS[iconName];
};

export default getIconComponent;
