import { EXPENSE_ICONS } from '../constants/expenseConstants';

const getIconComponent = (iconName) => {
  return EXPENSE_ICONS[iconName];
};

export default getIconComponent;
