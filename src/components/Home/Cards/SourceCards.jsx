import React, { useEffect, useRef } from 'react';
import SourceCard from './SourceCard';
import { useExpenses } from '../../../context/ExpensesContext';
import { CATEGORIES, EXPENSE_ICONS } from '../../../constants/expenseConstants';

export default function SourceCards() {
  const { expenses, addExpense, getExpensesByCategory } = useExpenses();
  const initialized = useRef(false);

  console.log(getExpensesByCategory());

  return <div className="flex flex-col gap-2 my-5"></div>;
}
