import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCategories } from './CategoryContext';
import { useSearchParams } from 'react-router-dom';
import { createTransaction } from '../models/transaction';

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const { categories } = useCategories();

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transactionData) => {
    const newTransaction = createTransaction(transactionData);
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const editTransaction = (id, newData) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, ...newData } : transaction
      )
    );
  };

  const removeTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const getTransactionsByCategory = (filteredTransactions) => {
    return (filteredTransactions || transactions).reduce((acc, transaction) => {
      const { category, amount, currency } = transaction;
      acc[category] = {
        amount: (acc[category]?.amount || 0) + amount,
        currency,
      };
      return acc;
    }, {});
  };

  const filterTransactionsByPeriod = (
    periodFilter,
    offset = 0,
    transactionType = null,
    startDate = null,
    endDate = null
  ) => {
    if (!transactionType) {
      return [...transactions];
    }

    const transactionsToFilter = transactions.filter(
      (trans) => trans.type.toLowerCase() === transactionType
    );
    console.log(periodFilter, transactionType, transactionsToFilter);
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
      return transactionsToFilter.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionTime = transactionDate.getTime();
        return (
          transactionTime >= effectiveStartDate.getTime() &&
          transactionTime <= effectiveEndDate.getTime()
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
        return transactionsToFilter;
    }

    return transactionsToFilter.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionTime = transactionDate.getTime();

      switch (periodFilter) {
        case 'day':
          const startOfDay = new Date(baseDate);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(baseDate);
          endOfDay.setHours(23, 59, 59, 999);
          return (
            transactionTime >= startOfDay.getTime() &&
            transactionTime <= endOfDay.getTime()
          );

        case 'week':
          const startOfWeek = new Date(baseDate);
          startOfWeek.setDate(baseDate.getDate() - 6);
          startOfWeek.setHours(0, 0, 0, 0);
          const endOfWeek = new Date(baseDate);
          endOfWeek.setHours(23, 59, 59, 999);
          return (
            transactionTime >= startOfWeek.getTime() &&
            transactionTime <= endOfWeek.getTime()
          );

        case 'month':
          const year = baseDate.getFullYear();
          const month = baseDate.getMonth();
          const startOfMonth = new Date(year, month, 1);
          const endOfMonth = new Date(year, month + 1, 0);
          endOfMonth.setHours(23, 59, 59, 999);
          return (
            transactionTime >= startOfMonth.getTime() &&
            transactionTime <= endOfMonth.getTime()
          );

        case 'year':
          const currentYear = baseDate.getFullYear();
          const startOfYear = new Date(currentYear, 0, 1);
          const endOfYear = new Date(currentYear, 11, 31);
          endOfYear.setHours(23, 59, 59, 999);
          return (
            transactionTime >= startOfYear.getTime() &&
            transactionTime <= endOfYear.getTime()
          );

        default:
          return true;
      }
    });
  };

  const getFilteredCategoriesWithAmount = (
    periodFilter,
    offset = 0,
    transactionType,
    startDate = null,
    endDate = null
  ) => {
    const filteredTransactions = filterTransactionsByPeriod(
      periodFilter,
      offset,
      transactionType,
      startDate,
      endDate
    );
    const categoriesTransactions =
      getTransactionsByCategory(filteredTransactions);
    return Object.entries(categoriesTransactions)
      .map(([categoryId, value]) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return { ...category, amount: value.amount, currency: value.currency };
      })
      .filter((item) => item !== undefined);
  };

  const getBalanceByPeriod = (
    periodFilter = null,
    offset = null,
    transactionType = null,
    startDate = null,
    endDate = null
  ) => {
    const filteredTransactions = filterTransactionsByPeriod(
      periodFilter,
      offset,
      transactionType,
      startDate,
      endDate
    );
    const balance = filteredTransactions.reduce((acc, cur) => {
      if (cur.type === 'Income') {
        return acc + cur.amount;
      } else {
        return acc - cur.amount;
      }
    }, 0);

    if (transactionType) {
      return transactionType === 'income' ? balance : -balance;
    }
    return balance;
  };

  const getBalanceByAccount = (accountId) => {
    const filteredTransactions = transactions.filter(
      (trans) => trans.account === accountId
    );
    const balance = filteredTransactions.reduce((acc, cur) => {
      if (cur.type === 'Income') {
        return acc + cur.amount;
      } else {
        return acc - cur.amount;
      }
    }, 0);

    return balance;
  };

  const value = {
    transactions,
    addTransaction,
    editTransaction,
    removeTransaction,
    getTransactionsByCategory,
    getFilteredCategoriesWithAmount,
    getBalanceByPeriod,
    getBalanceByAccount,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      'usetransactions must be used within an transactionsProvider'
    );
  }
  return context;
}
