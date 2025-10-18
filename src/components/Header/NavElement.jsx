import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavElement({ children, to }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === to;
  return (
    <li
      className={`px-10 py-2 rounded-md  cursor-pointer ${
        isActive
          ? 'bg-white text-[#1677ff]'
          : 'hover:bg-sky-200 hover:text-[#1677ff]'
      }`}
      onClick={() => navigate(to)}
    >
      {children}
    </li>
  );
}
