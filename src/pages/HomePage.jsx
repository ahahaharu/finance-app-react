import React, { useEffect } from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import HomeStats from '../components/Home/Stats/HomeStats';
import SourceCards from '../components/Home/Cards/SourceCards';
import { useSearchParams } from 'react-router-dom';
import TransactionSwitch from '../components/TransactionSwitch/TransactionSwitch';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const hasTransaction = searchParams.get('transaction');
    const hasFilter = searchParams.get('filter');
    if (!hasTransaction || !hasFilter) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        transaction: 'expense',
        filter: 'week',
      }));
    }
  }, [searchParams, setSearchParams]);

  function toggleTransaction(transactionType) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      transaction: transactionType,
    }));
  }

  function togglePeriodFilter(periodFilter) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      filter: periodFilter,
    }));
  }

  const transactionType = searchParams.get('transaction') || 'expense';
  const periodFilter = searchParams.get('filter') || 'week';

  return (
    <Wrapper>
      <Balance />
      <TransactionSwitch
        transactionType={transactionType}
        toggleTransaction={toggleTransaction}
      />
      <HomeStats
        periodFilter={periodFilter}
        togglePeriodFilter={togglePeriodFilter}
      />
      <SourceCards />
    </Wrapper>
  );
}
