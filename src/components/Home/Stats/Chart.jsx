import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTransactions } from '../../../context/TransactionsContext';
import { useSettings } from '../../../context/SettingsContext';

export default function Chart({
  periodFilter,
  offset,
  transactionType,
  accountId,
  startDate,
  endDate,
}) {
  const { getFilteredCategoriesWithAmount, getBalanceByPeriod } =
    useTransactions();
  const { currentCurrency } = useSettings();

  const filteredCategories = getFilteredCategoriesWithAmount(
    periodFilter,
    offset,
    transactionType,
    accountId,
    periodFilter === 'period' && startDate && endDate ? startDate : null,
    periodFilter === 'period' && startDate && endDate ? endDate : null
  );

  const data = filteredCategories.map((category) => ({
    label: category.name,
    value: parseFloat(category.amount) || 0,
    color: category.color,
  }));

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 250, height: 250 }}
    >
      <PieChart
        className="cursor-pointer"
        series={[
          {
            data: data || [],
            innerRadius: 70,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
            cx: '50%',
            cy: '50%',
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
      {data.length !== 0 && (
        <div
          className="text-2xl font-bold text-black absolute"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            lineHeight: '1.2',
          }}
        >
          {getBalanceByPeriod(periodFilter, offset, transactionType)}{' '}
          {currentCurrency}
        </div>
      )}
    </div>
  );
}
