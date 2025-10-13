import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import HomeStats from '../components/Home/Stats/HomeStats';
import SourceCards from '../components/Home/Cards/SourceCards';
import TransactionSwitch from '../components/TransactionSwitch/TransactionSwitch';
import PeriodPickerModal from '../components/Home/Modal/PeriodPickerModal';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const transactionType = searchParams.get('transaction') || 'expense';
  const periodFilter = searchParams.get('filter') || 'week';
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    if (
      !currentParams.transaction ||
      !currentParams.filter ||
      !currentParams.offset
    ) {
      setSearchParams(
        (prev) => {
          const newParams = {
            ...Object.fromEntries(prev),
            transaction: currentParams.transaction || 'expense',
            filter: currentParams.filter || 'week',
            offset: currentParams.offset || '0',
          };
          return newParams;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  const openPeriodPicker = () => {
    setIsModalOpen(true);
  };

  const handlePeriodPickerClose = () => {
    setIsModalOpen(false);
    setSearchParams(
      (prev) => {
        const newParams = {
          ...Object.fromEntries(prev),
          filter: 'week',
          offset: '0',
        };
        return newParams;
      },
      { replace: true }
    );
  };

  const handlePeriodSelect = (selectedRange) => {
    if (selectedRange && selectedRange.length === 2) {
      const [start, end] = selectedRange;
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        filter: 'period',
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD'),
        offset: '0',
      }));
      setIsModalOpen(false);
      console.log(
        'Selected period:',
        start.format('YYYY-MM-DD'),
        'to',
        end.format('YYYY-MM-DD')
      );
    }
  };

  function toggleTransaction(newTransactionType) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      transaction: newTransactionType,
    }));
  }

  function togglePeriodFilter(newPeriodFilter) {
    const newParams = {
      ...Object.fromEntries(searchParams),
      filter: newPeriodFilter,
      offset: '0',
    };

    if (newPeriodFilter !== 'period') {
      delete newParams.startDate;
      delete newParams.endDate;
    }

    setSearchParams(newParams);
    if (newPeriodFilter === 'period') {
      openPeriodPicker();
    }
  }

  function shiftPeriod(direction) {
    const step = direction === 'left' ? -1 : 1;
    const newOffset = offset + step;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      offset: newOffset.toString(),
    }));
  }

  return (
    <Wrapper>
      <Balance
        periodFilter={periodFilter}
        offset={offset}
        transactionType={transactionType}
      />
      <TransactionSwitch
        transactionType={transactionType}
        toggleTransaction={toggleTransaction}
      />
      <HomeStats
        periodFilter={periodFilter}
        togglePeriodFilter={togglePeriodFilter}
        offset={offset}
        shiftPeriod={shiftPeriod}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        openPeriodPicker={openPeriodPicker}
        transactionType={transactionType}
      />
      <SourceCards
        periodFilter={periodFilter}
        offset={offset}
        transactionType={transactionType}
      />
      <PeriodPickerModal
        title="Select Custom Period"
        isOpen={isModalOpen}
        onCancel={handlePeriodPickerClose}
        handleOk={handlePeriodSelect}
      />
    </Wrapper>
  );
}
