import React, { useState } from 'react';
import HomeStatsPeriods from './HomeStatsPeriods';
import HomeStatsChoosePeriod from './HomeStatsChoosePeriod';
import Button from '../../UI/Button';
import { ClipboardClock, Plus } from 'lucide-react';
import Chart from './Chart';
import AdditionalModal from '../Modal/AdditionalModal';
import TransactionHistoryModal from '../Modal/TransactionHistoryModal';

export default function HomeStats({ periodFilter, togglePeriodFilter }) {
  const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  function handleAdditionalModalOpen() {
    setAdditionalModalOpen(true);
  }

  return (
    <div className="w-full p-5 border-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <HomeStatsPeriods
        periodFilter={periodFilter}
        togglePeriodFilter={togglePeriodFilter}
      />
      <HomeStatsChoosePeriod />
      <Chart />
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
          title="Add Transaction"
          isOpen={additionalModalOpen}
          onCancel={() => setAdditionalModalOpen(false)}
        />
      )}

      {historyModalOpen && (
        <TransactionHistoryModal
          title="Transactions History"
          isOpen={historyModalOpen}
          onCancel={() => setHistoryModalOpen(false)}
        />
      )}
    </div>
  );
}
