import { createContext, useContext, useEffect, useState } from 'react';
import { ACCOUNTS } from '../constants/transactionsConstants';
import { createAccount } from '../models/account';

const AccountsContext = createContext();

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState(() => {
    const savedCategories = localStorage.getItem('accounts');
    if (savedCategories) {
      return JSON.parse(savedCategories);
    } else {
      const defaultAccounts = ACCOUNTS.map((cat) =>
        createAccount({
          name: cat.name,
          icon: cat.icon,
          color: cat.color,
        })
      );
      localStorage.setItem('accounts', JSON.stringify(defaultAccounts));
      return defaultAccounts;
    }
  });

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const addAccount = (data) => {
    const newAccount = createAccount(data);
    setAccounts((prev) => [...prev, newAccount]);
  };

  const editAccount = (id, newData) => {
    setAccounts((prev) =>
      prev.map((account) =>
        account.id === id ? { ...account, ...newData } : account
      )
    );
  };

  const removeAccount = (id) => {
    setAccounts((prev) => prev.filter((account) => account.id !== id));
  };

  const getAccountById = (accountId) => {
    return accounts.find((account) => account.id === accountId);
  };

  const value = {
    accounts,
    addAccount,
    editAccount,
    removeAccount,
    getAccountById,
  };

  return (
    <AccountsContext.Provider value={value}>
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (!context) {
    throw new Error('useCategories must be used within an CategoriesProvider');
  }
  return context;
}
