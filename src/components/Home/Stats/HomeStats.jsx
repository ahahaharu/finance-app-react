import React, { useState } from 'react';
import HomeStatsPeriods from './HomeStatsPeriods';
import HomeStatsChoosePeriod from './HomeStatsChoosePeriod';
import Button from '../../UI/Button';
import { ClipboardClock, Plus } from 'lucide-react';
import Chart from './Chart';
import AdditionalModal from '../Modal/AdditionalModal';

export default function HomeStats() {
  const [additionModalOpen, setAdditionalModalOpen] = useState(false);

  console.log('Home stats ', additionModalOpen);
  function handleAdditionalModalOpen() {
    setAdditionalModalOpen(true);
  }

  return (
    <div className="w-full p-5 border-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <HomeStatsPeriods />
      <HomeStatsChoosePeriod />
      <Chart />
      <div className="w-full flex justify-center gap-3">
        <Button icon={<Plus />} onClick={handleAdditionalModalOpen} primary>
          Add Expenses
        </Button>
        <Button icon={<ClipboardClock />}>History</Button>
      </div>

      {additionModalOpen && (
        <AdditionalModal
          title="Add Transaction"
          isOpen={additionModalOpen}
          onCancel={() => setAdditionalModalOpen(false)}
        />
      )}
    </div>
  );
}
