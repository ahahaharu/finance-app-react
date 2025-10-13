import React, { useState } from 'react';
import HomeStatsPeriods from './HomeStatsPeriods';
import HomeStatsChoosePeriod from './HomeStatsChoosePeriod';
import Button from '../../UI/Button';
import { ClipboardClock, Plus } from 'lucide-react';
import Chart from './Chart';
import AdditionalModal from '../Modal/AdditionalModal';
import TransactionHistoryModal from '../Modal/TransactionHistoryModal';

const backToCurrent = {
  day: 'Today',
  week: 'Current Week',
  month: 'Current Month',
  year: 'Current Year',
};

export default function HomeStats({
  periodFilter,
  togglePeriodFilter,
  offset,
  shiftPeriod,
  searchParams,
  setSearchParams,
  transactionType,
}) {
  const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const startDate =
    periodFilter === 'period' ? searchParams.get('startDate') : null;
  const endDate =
    periodFilter === 'period' ? searchParams.get('endDate') : null;

  function handleAdditionalModalOpen() {
    setAdditionalModalOpen(true);
  }

  const handleBackToCurrent = () => {
    const newParams = {
      ...Object.fromEntries(searchParams),
      filter: periodFilter,
      offset: '0',
    };
    if (periodFilter !== 'period' && (startDate || endDate)) {
      delete newParams.startDate;
      delete newParams.endDate;
    }
    setSearchParams(newParams);
  };

  return (
    <div className="w-full p-5 border-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <HomeStatsPeriods
        periodFilter={periodFilter}
        togglePeriodFilter={togglePeriodFilter}
      />
      <HomeStatsChoosePeriod
        periodFilter={periodFilter}
        shiftPeriod={shiftPeriod}
        offset={offset}
        startDate={startDate}
        endDate={endDate}
      />
      {offset !== 0 && (
        <span
          className="flex gap-1 items-center mt-2 hover:underline cursor-pointer"
          onClick={handleBackToCurrent}
        >
          Back to {backToCurrent[periodFilter]}
        </span>
      )}
      <Chart
        periodFilter={periodFilter}
        offset={offset}
        transactionType={transactionType}
        startDate={startDate}
        endDate={endDate}
      />
      <div className="w-full flex justify-center gap-3">
        <Button icon={<Plus />} onClick={handleAdditionalModalOpen} primary>
          Add Expenses
        </Button>
        <Button
          icon={<ClipboardClock />}
          onClick={() => setHistoryModalOpen(true)}
        >
          History
        </Button>
      </div>

      {additionalModalOpen && (
        <AdditionalModal
          isOpen={additionalModalOpen}
          onCancel={() => setAdditionalModalOpen(false)}
        />
      )}

      {historyModalOpen && (
        <TransactionHistoryModal
          title="Transactions History"
          isOpen={historyModalOpen}
          onCancel={() => setHistoryModalOpen(false)}
          transactionType={transactionType}
        />
      )}
    </div>
  );
}
