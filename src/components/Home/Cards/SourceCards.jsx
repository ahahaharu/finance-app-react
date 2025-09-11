import React, { useEffect, useRef } from 'react';
import SourceCard from './SourceCard';
import { useExpenses } from '../../../context/ExpensesContext';
import { Bus, Utensils } from 'lucide-react';
import { CATEGORIES, EXPENSE_ICONS } from '../../../constants/expenseConstants';

const INITIAL_EXPENSES = [
  {
    description: 'Transport',
    amount: '15.00',
    date: '2023-09-11',
    category: 'Transport',
    account: 'Card',
    iconName: CATEGORIES[1].icon,
    color: CATEGORIES[1].color,
  },
  {
    description: 'Sport',
    amount: '35.00',
    date: '2023-09-11',
    category: 'Sport',
    account: 'Cash',
    iconName: CATEGORIES[3].icon,
    color: CATEGORIES[3].color,
  },
  {
    description: 'Food',
    amount: '20.00',
    date: '2023-09-11',
    category: 'Food',
    account: 'Cash',
    iconName: CATEGORIES[0].icon,
    color: CATEGORIES[0].color,
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
    return EXPENSE_ICONS[iconName];
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
