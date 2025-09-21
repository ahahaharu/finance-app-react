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
    if (!searchParams.get('transaction')) {
      setSearchParams({ ...searchParams, transaction: 'expense' });
    }
  }, [searchParams, setSearchParams]);

  function toggleTransaction(transactionType) {
    setSearchParams({ ...searchParams, transaction: transactionType });
  }

  const transactionType = searchParams.get('transaction');

  return (
    <Wrapper>
      <Balance />
      <TransactionSwitch
        transactionType={transactionType}
        toggleTransaction={toggleTransaction}
      />
      <HomeStats />
      <SourceCards />
    </Wrapper>
  );
}
