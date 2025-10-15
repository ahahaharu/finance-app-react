import { createContext, useContext, useEffect, useState } from 'react';
const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [currentCurrency, setCurrentCurrency] = useState(() => {
    const currency = localStorage.getItem('currentCurrency');
    if (currency) {
      return JSON.parse(currency);
    } else {
      const defaultCurrency = 'USD';
      localStorage.setItem('currentCurrency', JSON.stringify(defaultCurrency));
      return defaultCurrency;
    }
  });

  useEffect(() => {
    localStorage.setItem('currentCurrency', JSON.stringify(currentCurrency));
  }, [currentCurrency]);

  const changeCurrency = (currency) => {
    setCurrentCurrency(currency);
  };

  const value = { currentCurrency, changeCurrency };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useCategories must be used within an SettingsProvider');
  }
  return context;
}
