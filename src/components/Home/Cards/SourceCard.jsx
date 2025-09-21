import React from 'react';
import getIconComponent from '../../../utils/getIconComponent';

export default function SourceCard({
  icon,
  categoryName,
  color,
  amount,
  currency,
  onClick,
}) {
  const styleColor = color;
  return (
    <div
      className="flex justify-between items-center border-[#1677ff] border-2 p-3 rounded-2xl shadow-md hover:bg-sky-50 cursor-pointer"
      onClick={onClick}
    >
      <div
        style={{ color: styleColor }}
        className={`flex gap-3  items-center `}
      >
        {getIconComponent(icon)} <h1 className="text-2xl">{categoryName}</h1>
      </div>
      <div className="text-lg">
        {amount} {currency}
      </div>
    </div>
  );
}
