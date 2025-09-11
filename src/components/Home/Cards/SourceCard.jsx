import React from 'react';

export default function SourceCard({ icon, category, color }) {
  const styleColor = color;
  console.log(styleColor);
  return (
    <div
      style={{ color: styleColor }}
      className={`flex gap-3 border-[#1677ff] items-center border-2 p-3 rounded-2xl shadow-md`}
    >
      {icon} <h1 className="text-2xl">{category}</h1>
    </div>
  );
}
