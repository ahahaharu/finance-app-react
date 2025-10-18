import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useCategories } from './CategoryContext';
import { useSettings } from './SettingsContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { createTransaction } from '../models/transaction';
import { createTransfer } from '../models/transfer';
import { createAdjustment } from '../models/adjustment';

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const { categories } = useCategories();
  const { currentCurrency } = useSettings();
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
  const API_URL = API_KEY
    ? `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currentCurrency}`
    : null;

  useEffect(() => {
    if (!API_KEY || !API_URL) {
      setError('API-ключ не настроен. Проверьте файл .env');
      setLoading(false);
      return;
    }

    const cachedRates = localStorage.getItem(
      `exchangeRates_${currentCurrency}`
    );
    const cacheTime = localStorage.getItem(
      `exchangeRatesTime_${currentCurrency}`
    );
    const now = Date.now();

    if (cachedRates && cacheTime && now - cacheTime < 24 * 60 * 60 * 1000) {
      setExchangeRates(JSON.parse(cachedRates));
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        setExchangeRates(response.data.conversion_rates);
        localStorage.setItem(
          `exchangeRates_${currentCurrency}`,
          JSON.stringify(response.data.conversion_rates)
        );
        localStorage.setItem(`exchangeRatesTime_${currentCurrency}`, now);
        setLoading(false);
      })
      .catch((err) => {
        setError('Ошибка загрузки курсов валют');
        setLoading(false);
        console.error(err);
      });
  }, [currentCurrency, API_URL]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transactionData) => {
    const newTransaction = createTransaction(transactionData);
    setTransactions((prev) => [...prev, newTransaction]);
    return newTransaction.id;
  };

  const addTransfer = (transferData) => {
    const newTransfer = createTransfer(transferData);
    setTransactions((prev) => [...prev, newTransfer]);
    return newTransfer.id;
  };

  const editTransaction = (id, newData) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, ...newData } : transaction
      )
    );
  };

  const editTransfer = (id, newData) => {
    editTransaction(id, newData);
  };

  const removeTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const removeTransfer = (id) => {
    removeTransaction(id);
  };

  const createBalanceAdjustment = (amount, currency, account) => {
    if (amount == 0) return;

    console.log(amount);

    const balanceAdjustment = createAdjustment({
      amount,
      currency,
      account,
    });
    setTransactions((prev) => [...prev, balanceAdjustment]);
  };

  const getTransactionsByCategory = (filteredTransactions) => {
    return (filteredTransactions || transactions).reduce((acc, transaction) => {
      const { category, amount, currency } = transaction;
      const convertedAmount =
        currency === currentCurrency
          ? amount
          : Number((amount / (exchangeRates[currency] || 1)).toFixed(2));
      acc[category] = {
        amount: (acc[category]?.amount || 0) + convertedAmount,
        currency: currentCurrency,
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
    if (loading || error || !API_KEY) return 0;

    const filteredTransactions = filterTransactionsByPeriod(
      periodFilter,
      offset,
      transactionType,
      startDate,
      endDate
    );
    const balance = filteredTransactions
      .reduce((acc, cur) => {
        const convertedAmount =
          cur.currency === currentCurrency
            ? cur.amount
            : Number(cur.amount / (exchangeRates[cur.currency] || 1));
        if (cur.type === 'Income') {
          return acc + convertedAmount;
        } else if (cur.type === 'Expense') {
          return acc - convertedAmount;
        } else if (cur.type === 'Adjustment') {
          return acc + convertedAmount;
        } else return acc;
      }, 0)
      .toFixed(2);

    if (transactionType) {
      return transactionType === 'income' ? balance : -balance;
    }

    return balance;
  };

  const getBalanceByAccount = (accountId) => {
    if (loading || error || !API_KEY) return 0;

    const filteredTransactions = transactions.filter(
      (trans) =>
        trans.account === accountId ||
        trans.from === accountId ||
        trans.to === accountId
    );

    const balance = filteredTransactions.reduce((acc, cur) => {
      const convertedAmount =
        cur.currency === currentCurrency
          ? cur.amount
          : Number(
              (cur.amount / (exchangeRates[cur.currency] || 1)).toFixed(2)
            );

      if (cur.type === 'Income') {
        return acc + convertedAmount;
      } else if (cur.type === 'Expense') {
        return acc - convertedAmount;
      } else if (cur.type === 'Transfer') {
        if (cur.from === accountId) {
          return acc - convertedAmount;
        } else if (cur.to === accountId) {
          return acc + convertedAmount;
        }
      } else if (cur.type === 'Adjustment') {
        return acc + convertedAmount;
      }
      return acc;
    }, 0);

    return balance.toFixed(2);
  };

  const value = {
    transactions,
    addTransaction,
    addTransfer,
    editTransaction,
    editTransfer,
    removeTransaction,
    removeTransfer,
    createBalanceAdjustment,
    getTransactionsByCategory,
    getFilteredCategoriesWithAmount,
    getBalanceByPeriod,
    getBalanceByAccount,
    loading,
    error,
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
      'useTransactions must be used within a TransactionsProvider'
    );
  }
  return context;
}
