import React, { useEffect, useMemo, useRef } from 'react';
import SourceCard from './SourceCard';
import { useExpenses } from '../../../context/ExpensesContext';
import { CATEGORIES, EXPENSE_ICONS } from '../../../constants/expenseConstants';
import { useCategories } from '../../../context/CategoryContext';

export default function SourceCards() {
  const { expenses, addExpense, categoriesWithAmount } = useExpenses();
  const { categories } = useCategories();
  const initialized = useRef(false);

  return (
    <div className="flex flex-col gap-2 my-5">
      {categoriesWithAmount.map((category) => (
        <SourceCard
          key={category.name}
          icon={category.icon}
          categoryName={category.name}
          color={category.color}
          amount={category.amount}
          currency={category.currency}
        />
      ))}
    </div>
  );
}
