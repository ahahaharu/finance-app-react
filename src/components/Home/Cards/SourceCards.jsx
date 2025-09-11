import React, { useEffect, useRef } from 'react';
import SourceCard from './SourceCard';
import { useExpenses } from '../../../context/ExpensesContext';
import { Bus, Utensils } from 'lucide-react';
import { CATEGORIES } from '../../../constants/expenseConstants';

const INITIAL_EXPENSES = [
  {
    description: 'Cafe',
    amount: '25.50',
    date: '2023-09-10',
    category: 'Cafe',
    account: 'Cash',
    iconName: CATEGORIES[6].icon,
    color: CATEGORIES[6].color,
  },
  {
    description: 'Transport',
    amount: '15.00',
    date: '2023-09-11',
    category: 'Transport',
    account: 'Card',
    iconName: CATEGORIES[1].icon,
    color: CATEGORIES[1].color,
  },
];

export default function SourceCards() {
  const { expenses, addExpense } = useExpenses();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && expenses.length === 0) {
      INITIAL_EXPENSES.forEach((expense) => addExpense(expense));
    }
    initialized.current = true;
  }, [expenses.length]);

  const getIconComponent = (iconName) => {
    const icons = {
      Utensils: <Utensils size={30} />,
      Bus: <Bus size={30} />,
    };
    return icons[iconName];
  };

  return (
    <div className="flex flex-col gap-2 my-5">
      {expenses?.map((item) => (
        <SourceCard
          key={item.id}
          icon={getIconComponent(item.iconName)}
          category={item.category}
          color={item.color}
        />
      ))}
    </div>
  );
}
