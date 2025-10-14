import React, { useState } from 'react';
import SourceCard from './SourceCard';
import CategoryHistoryModal from '../Modal/CategoryHistoryModal';
import { useTransactions } from '../../../context/TransactionsContext';

export default function SourceCards({
  periodFilter,
  offset,
  transactionType,
  startDate,
  endDate,
}) {
  const { getFilteredCategoriesWithAmount } = useTransactions();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const filteredCategories = getFilteredCategoriesWithAmount(
    periodFilter,
    offset,
    transactionType,
    periodFilter === 'period' && startDate && endDate ? startDate : null,
    periodFilter === 'period' && startDate && endDate ? endDate : null
  );

  return (
    <div className="flex flex-col gap-2 my-2">
      {filteredCategories.map((category) => (
        <SourceCard
          key={category.id}
          icon={category.icon}
          categoryName={category.name}
          color={category.color}
          amount={category.amount}
          currency={category.currency}
          onClick={() => setSelectedCategoryId(category.id)}
        />
      ))}

      {!!selectedCategoryId && (
        <CategoryHistoryModal
          title={'Category History'}
          isOpen={!!selectedCategoryId}
          onCancel={() => setSelectedCategoryId(null)}
          categoryId={selectedCategoryId}
        />
      )}
    </div>
  );
}
