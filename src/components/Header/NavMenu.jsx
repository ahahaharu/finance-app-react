import React from 'react';
import NavElement from './NavElement';
import { useNavigate } from 'react-router-dom';

const items = ['Home', 'Accounts', 'Charts', 'Settings'];

export default function NavMenu() {
  const navigate = useNavigate();
  return (
    <nav>
      <ul className="flex text-white gap-3 mx-auto">
        {items.map((item) => (
          <NavElement to={`/${item.toLowerCase()}`}>{item}</NavElement>
        ))}
      </ul>
    </nav>
  );
}
