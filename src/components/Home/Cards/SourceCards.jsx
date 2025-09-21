import React, { useState } from 'react';
import SourceCard from './SourceCard';
import { useExpenses } from '../../../context/ExpensesContext';
import { Modal } from 'antd';
import CategoryHistoryModal from '../Modal/CategoryHistoryModal';

export default function SourceCards() {
  const { categoriesWithAmount } = useExpenses();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div className="flex flex-col gap-2 my-5">
      {categoriesWithAmount.map((category) => (
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
