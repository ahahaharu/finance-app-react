import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createExpense } from '../models/expence';
import { useCategories } from './CategoryContext';
import { useSearchParams } from 'react-router-dom';

const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [searchParams] = useSearchParams();
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

  const getExpensesByCategory = (filteredExpenses) => {
    return (filteredExpenses || expenses).reduce((acc, expence) => {
      const { category, amount, currency } = expence;
      acc[category] = {
        amount: (acc[category]?.amount || 0) + amount,
        currency,
      };
      return acc;
    }, {});
  };

  const filterExpensesByPeriod = (
    periodFilter,
    offset = 0,
    startDate = null,
    endDate = null
  ) => {
    const expensesToFilter = [...expenses];
    const now = new Date();

    const effectiveStartDate = startDate
      ? new Date(startDate)
      : searchParams.get('startDate')
      ? new Date(searchParams.get('startDate'))
      : null;
    const effectiveEndDate = endDate
      ? new Date(endDate)
      : searchParams.get('endDate')
      ? new Date(searchParams.get('endDate'))
      : null;

    if (periodFilter === 'period' && effectiveStartDate && effectiveEndDate) {
      effectiveEndDate.setHours(23, 59, 59, 999);
      return expensesToFilter.filter((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseTime = expenseDate.getTime();
        return (
          expenseTime >= effectiveStartDate.getTime() &&
          expenseTime <= effectiveEndDate.getTime()
        );
      });
    }

    let baseDate = new Date(now);
    switch (periodFilter) {
      case 'day':
        baseDate.setDate(now.getDate() + offset);
        break;
      case 'week':
        baseDate.setDate(now.getDate() + offset * 7);
        break;
      case 'month':
        baseDate.setMonth(now.getMonth() + offset);
        break;
      case 'year':
        baseDate.setFullYear(now.getFullYear() + offset);
        break;
      default:
        return expensesToFilter;
    }

    return expensesToFilter.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expenseTime = expenseDate.getTime();

      switch (periodFilter) {
        case 'day':
          const startOfDay = new Date(baseDate);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(baseDate);
          endOfDay.setHours(23, 59, 59, 999);
          return (
            expenseTime >= startOfDay.getTime() &&
            expenseTime <= endOfDay.getTime()
          );

        case 'week':
          const startOfWeek = new Date(baseDate);
          startOfWeek.setDate(baseDate.getDate() - 6);
          startOfWeek.setHours(0, 0, 0, 0);
          const endOfWeek = new Date(baseDate);
          endOfWeek.setHours(23, 59, 59, 999);
          return (
            expenseTime >= startOfWeek.getTime() &&
            expenseTime <= endOfWeek.getTime()
          );

        case 'month':
          const year = baseDate.getFullYear();
          const month = baseDate.getMonth();
          const startOfMonth = new Date(year, month, 1);
          const endOfMonth = new Date(year, month + 1, 0);
          endOfMonth.setHours(23, 59, 59, 999);
          return (
            expenseTime >= startOfMonth.getTime() &&
            expenseTime <= endOfMonth.getTime()
          );

        case 'year':
          const currentYear = baseDate.getFullYear();
          const startOfYear = new Date(currentYear, 0, 1);
          const endOfYear = new Date(currentYear, 11, 31);
          endOfYear.setHours(23, 59, 59, 999);
          return (
            expenseTime >= startOfYear.getTime() &&
            expenseTime <= endOfYear.getTime()
          );

        default:
          return true;
      }
    });
  };

  const getFilteredCategoriesWithAmount = (
    periodFilter,
    offset = 0,
    startDate = null,
    endDate = null
  ) => {
    const filteredExpenses = filterExpensesByPeriod(
      periodFilter,
      offset,
      startDate,
      endDate
    );
    const categoriesExpenses = getExpensesByCategory(filteredExpenses);
    return Object.entries(categoriesExpenses)
      .map(([categoryId, value]) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return { ...category, amount: value.amount, currency: value.currency };
      })
      .filter((item) => item !== undefined);
  };

  const value = {
    expenses,
    addExpense,
    editExpense,
    removeExpense,
    getExpensesByCategory,
    getFilteredCategoriesWithAmount,
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
