import React from 'react';

export default function ToggleSources() {
  return (
    <div className="flex gap-3 w-full text-center justify-center mb-5 text-xl">
      <div
        className="py-1 px-3 rounded-md cursor-pointer
          bg-[#1677ff] text-white"
      >
        Expenses
      </div>
      <div className="py-1 px-3 rounded-md cursor-pointer hover:bg-sky-100">
        Income
      </div>
    </div>
  );
}
