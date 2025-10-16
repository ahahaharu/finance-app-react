import React from 'react';
import { useTransactions } from '../../context/TransactionsContext';
import { useSettings } from '../../context/SettingsContext';
import { Spin } from 'antd';

export default function Balance() {
  const { getBalanceByPeriod, loading } = useTransactions();
  const { currentCurrency } = useSettings();

  console.log(getBalanceByPeriod(), loading);
  return (
    <div className="my-10">
      <div>
        <p>Total Balance</p>
      </div>
      <h1 className="text-6xl font-semibold text-black">
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            {getBalanceByPeriod()} {currentCurrency}
          </>
        )}
      </h1>
    </div>
  );
}
