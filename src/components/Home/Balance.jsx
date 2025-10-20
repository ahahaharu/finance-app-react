import React from 'react';
import { useTransactions } from '../../context/TransactionsContext';
import { useSettings } from '../../context/SettingsContext';
import { Spin } from 'antd';

export default function Balance({ accountId }) {
  const { getBalanceByPeriod, getBalanceByAccount, loading } =
    useTransactions();
  const { currentCurrency } = useSettings();

  return (
    <h1 className="text-6xl font-semibold text-black my-3">
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          {accountId ? getBalanceByAccount(accountId) : getBalanceByPeriod()}{' '}
          {currentCurrency}
        </>
      )}
    </h1>
  );
}
