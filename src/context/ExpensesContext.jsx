import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createExpense } from '../models/expence';
import { useCategories } from './CategoryContext';

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const { categories } = useCategories();

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
      const { category, amount, currency } = expence;
      acc[category] = {
        amount: (acc[category]?.amount || 0) + amount,
        currency,
      };
      return acc;
    }, {});
  };

  const categoriesWithAmount = useMemo(() => {
    const categoriesExpenses = getExpensesByCategory();
    console.log(categoriesExpenses);
    const cardsInfo = Object.entries(categoriesExpenses).map(
      ([categoryName, value]) => {
        const category = categories.find((cat) => cat.name == categoryName);
        console.log(categoryName);
        return { ...category, amount: value.amount, currency: value.currency };
      }
    );
    return cardsInfo;
  }, [expenses]);

  const value = {
    expenses,
    addExpense,
    editExpense,
    removeExpense,
    getExpensesByCategory,
    categoriesWithAmount,
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
