import React from 'react';
import NavMenu from './NavMenu';

function Header() {
  return (
    <header className="bg-[#1677ff] mx-auto p-3 rounded-b-2xl flex justify-center max-w-[60%] shadow-2xl sticky top-0 z-10 ">
      <NavMenu />
    </header>
  );
}

export default Header;
