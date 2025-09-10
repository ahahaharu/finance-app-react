import { createContext, useContext, useEffect, useState } from 'react';
import { createExpense } from '../models/expence';

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expenceDate) => {
    const newExpense = createExpense(expenceDate);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const value = {
    expenses,
    addExpense,
    removeExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
}
