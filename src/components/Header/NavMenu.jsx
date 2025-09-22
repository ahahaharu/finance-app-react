import React from 'react';
import NavElement from './NavElement';

// TODO: сделать навигацию

const items = ['Home', 'Accounts', 'Charts', 'Settings'];

export default function NavMenu() {
  return (
    <nav>
      <ul className="flex text-white gap-3 mx-auto">
        {items.map((item) => (
          <NavElement>{item}</NavElement>
        ))}
      </ul>
    </nav>
  );
}
