import React from 'react';

export default function TransactionSwitchButton({ text, isActive, onClick }) {
  return (
    <div
      className={`py-1 px-3 rounded-md cursor-pointer
      ${isActive ? 'bg-[#1677ff] text-white' : 'hover:bg-sky-100'}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
