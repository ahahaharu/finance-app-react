import React from 'react';
import { EXPENSE_ICONS } from '../../../constants/expenseConstants';

export default function CategoryItem({ category, isSelected, onClick }) {
  return (
    <div
      className={`flex flex-col items-center justify-center w-1/5 p-0.5 rounded cursor-pointer text-xs text-left transition-all ${
        isSelected ? 'border-1 border-blue-500 bg-sky-50 shadow-md' : ''
      }`}
      style={{ color: category.color }}
      onClick={onClick}
    >
      {EXPENSE_ICONS[category.icon]}
      <span
        className={`text-center mt-1 w-full whitespace-nowrap overflow-hidden text-ellipsis`}
      >
        {category.name}
      </span>
    </div>
  );
}
