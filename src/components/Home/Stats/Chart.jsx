import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTransactions } from '../../../context/TransactionsContext';

export default function Chart({
  periodFilter,
  offset,
  transactionType,
  startDate,
  endDate,
}) {
  const { getFilteredCategoriesWithAmount } = useTransactions();

  const filteredCategories = getFilteredCategoriesWithAmount(
    periodFilter,
    offset,
    transactionType,
    periodFilter === 'period' && startDate && endDate ? startDate : null,
    periodFilter === 'period' && startDate && endDate ? endDate : null
  );

  const data = filteredCategories.map((category) => ({
    label: category.name,
    value: parseFloat(category.amount) || 0,
    color: category.color,
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
