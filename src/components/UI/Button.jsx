import React from 'react';

export default function Button({ children, icon, primary = false, onClick }) {
  return (
    <button
      className={` ${
        primary
          ? 'bg-[#1677ff] text-white hover:bg-sky-400'
          : 'border-2 border-[#1677ff] hover:bg-sky-100'
      } text-lg font-medium px-4 py-2 rounded-lg  transition cursor-pointer ${
        icon ? 'flex items-center gap-2' : ''
      }`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}
