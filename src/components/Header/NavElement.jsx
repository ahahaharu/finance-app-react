import React from 'react';

export default function NavElement({ children }) {
  return (
    <li className="px-10 py-2 rounded-md hover:bg-sky-200 hover:text-[#1677ff] cursor-pointer">
      {children}
    </li>
  );
}
