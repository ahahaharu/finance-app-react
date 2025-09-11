import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useExpenses } from '../../../context/ExpensesContext';

export default function Chart() {
  const { expenses } = useExpenses();

  const data = expenses.map((expense) => ({
    label: expense.category,
    value: parseFloat(expense.amount),
    color: expense.color,
  }));
  return (
    <PieChart
      className="cursor-pointer"
      series={[
        {
          data: data || [],
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
