import React from 'react';
import { TRANSACTION_ICONS } from '../../../constants/transactionsConstants';

export default function CategoryItem({ category, isSelected, onClick }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-1/5 p-0.5 rounded cursor-pointer text-xs text-left hover:bg-sky-50 transition-all  ${
        isSelected
          ? 'ring-2 ring-offset-2 ring-blue-500 bg-sky-100 shadow-md'
          : ''
      }`}
      style={{ color: category.color }}
      onClick={onClick}
    >
      {TRANSACTION_ICONS[category.icon]}
      <span
        className={`text-center mt-1 w-full whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {category.name}
      </span>
    </div>
  );
}
3;
