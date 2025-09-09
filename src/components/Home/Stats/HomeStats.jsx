import React from 'react';
import HomeStatsPeriods from './HomeStatsPeriods';
import HomeStatsChoosePeriod from './HomeStatsChoosePeriod';
import Button from '../../UI/Button';
import { Plus } from 'lucide-react';
import Chart from './Chart';

const data = [
  { id: 0, value: 100, label: 'Cafe' },
  { id: 1, value: 25, label: 'Transport' },
  { id: 2, value: 55, label: 'Grocies' },
  { id: 2, value: 40, label: 'Workout' },
];

export default function HomeStats() {
  return (
    <div className="w-full p-5 border-2 rounded-2xl shadow-lg flex flex-col items-center justify-center">
      <HomeStatsPeriods />
      <HomeStatsChoosePeriod />
      <Chart data={data} />
      <Button icon={<Plus />}>Add Expenses</Button>
    </div>
  );
}
