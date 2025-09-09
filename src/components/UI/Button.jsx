import React from 'react';

export default function Button({ children, icon }) {
  return (
    <button
      className={`bg-[#1677ff] text-white text-lg font-medium px-4 py-2 rounded-lg hover:bg-sky-400 transition ${
        icon ? 'flex items-center gap-2' : ''
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
