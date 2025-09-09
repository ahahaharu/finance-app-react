import React from 'react';

export default function HomeStatsPeriodsElement({ children, active }) {
  return (
    <div
      className={`py-1 px-3 rounded-md cursor-pointer ${
        active ? 'bg-[#1677ff] text-white' : 'hover:bg-sky-100 '
      }`}
    >
      {children}
    </div>
  );
}
