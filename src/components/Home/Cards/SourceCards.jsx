import React, { useEffect, useRef } from 'react';
import SourceCard from './SourceCard';
import { useExpenses } from '../../../context/ExpensesContext';
import { Bus, Utensils } from 'lucide-react';

const INITIAL_EXPENSES = [
  {
    description: 'Cafe',
    amount: '25.50',
    date: '2023-09-10',
    category: 'Cafe',
    account: 'Cash',
    iconName: 'Utensils',
    color: '#ef4444',
  },
  {
    description: 'Transport',
    amount: '15.00',
    date: '2023-09-11',
    category: 'Transport',
    account: 'Card',
    iconName: 'Bus',
    color: '#3b82f6',
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

  function setTailwindColor(color) {
    return `text-[${color}]`;
  }

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
          color={setTailwindColor(item.color)}
        />
      ))}
    </div>
  );
}
