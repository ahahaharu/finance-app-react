import React, { useState } from 'react';
import getIconComponent from '../../../utils/getIconComponent';
import { useCategories } from '../../../context/CategoryContext';
import TransactionInfoModal from '../Modal/TransactionInfoModal';

export default function TransactionCard({ transaction, onClick }) {
  const { category, amount, currency } = transaction;
  const { getCategoryByName } = useCategories();
  const categoryObject = getCategoryByName(category);

  return (
    <div
      className="flex justify-between border-2 border-blue-500 rounded-xl p-3 items-center cursor-pointer hover:bg-sky-50"
      onClick={onClick}
    >
      <div
        style={{ color: categoryObject.color }}
        className="flex items-center gap-2 text-lg"
      >
        {getIconComponent(categoryObject.icon)}
        {categoryObject.name}
      </div>
      <div className="text-lg text-blue-500">
        <span className="font-bold">{amount}</span> {currency}
      </div>
    </div>
  );
}
