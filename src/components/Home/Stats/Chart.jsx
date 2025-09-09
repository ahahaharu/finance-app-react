import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function Chart({ data }) {
  return (
    <PieChart
      series={[
        {
          data,
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
  );
}
