import React from 'react';
import NavElement from './NavElement';

const items = ['Home', 'Accounts', 'Charts', 'Settings'];

export default function NavMenu() {
  return (
    <ul className="flex text-white gap-3 mx-auto">
      {items.map((item) => (
        <NavElement>{item}</NavElement>
      ))}
    </ul>
  );
}
