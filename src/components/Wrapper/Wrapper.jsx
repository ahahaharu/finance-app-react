import React from 'react';

export default function Wrapper({ children }) {
  return <div className="mx-auto w-[800px] text-center">{children}</div>;
}
