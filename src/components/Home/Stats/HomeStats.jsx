import React from 'react';
import HomeStatsPeriods from './HomeStatsPeriods';
import HomeStatsChoosePeriod from './HomeStatsChoosePeriod';
import { PieChart } from '@mui/x-charts/PieChart';
import Button from '../../UI/Button';
import { Plus } from 'lucide-react';

export default function HomeStats() {
  return (
    <div className="w-full p-5 border-2 rounded-2xl shadow-md flex flex-col items-center justify-center">
      <HomeStatsPeriods />
      <HomeStatsChoosePeriod />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
              { id: 2, value: 55, label: 'series C' },
            ],
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 360,
            cx: 125,
            cy: 125,
          },
        ]}
        width={250}
        height={250}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      />
      <Button icon={<Plus />}>Add Expenses</Button>
    </div>
  );
}
