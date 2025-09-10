import React from 'react';
import HomeStatsPeriods from './HomeStatsPeriods';
import HomeStatsChoosePeriod from './HomeStatsChoosePeriod';
import Button from '../../UI/Button';
import { ClipboardClock, Plus } from 'lucide-react';
import Chart from './Chart';

export default function HomeStats() {
  return (
    <div className="w-full p-5 border-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <HomeStatsPeriods />
      <HomeStatsChoosePeriod />
      <Chart />
      <div className="w-full flex justify-center gap-3">
        <Button icon={<Plus />} primary>
          Add Expenses
        </Button>
        <Button icon={<ClipboardClock />}>History</Button>
      </div>
    </div>
  );
}
