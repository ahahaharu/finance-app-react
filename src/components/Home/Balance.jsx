import React from 'react';
import { useTransactions } from '../../context/TransactionsContext';

export default function Balance() {
  const { getBalanceByPeriod } = useTransactions();

  return (
    <div className="my-10">
      <p>Current Balance</p>
      <h1 className="text-6xl font-semibold text-black">
        {getBalanceByPeriod()} USD
      </h1>
    </div>
  );
}
