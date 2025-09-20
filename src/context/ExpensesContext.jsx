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

  const addExpense = (expenceData) => {
    const newExpense = createExpense(expenceData);
    setExpenses((prev) => [...prev, newExpense]);
  };

  const editExpense = (id, newData) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, ...newData } : expense
      )
    );
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expence) => {
      const { category, amount } = expence;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
  };

  const value = {
    expenses,
    addExpense,
    editExpense,
    removeExpense,
    getExpensesByCategory,
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
