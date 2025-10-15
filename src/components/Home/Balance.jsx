import React from 'react';
import { useTransactions } from '../../context/TransactionsContext';
import { useSettings } from '../../context/SettingsContext';

export default function Balance() {
  const { getBalanceByPeriod } = useTransactions();
  const { currentCurrency } = useSettings();

  return (
    <div className="my-10">
      <div>
        <p>Total Balance</p>
      </div>
      <h1 className="text-6xl font-semibold text-black">
        {getBalanceByPeriod()} {currentCurrency}
      </h1>
    </div>
  );
}
