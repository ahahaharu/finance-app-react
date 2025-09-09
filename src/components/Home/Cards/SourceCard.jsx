import React from 'react';

export default function SourceCard({ icon, text, color }) {
  return (
    <div
      className={`flex gap-3 border-[#1677ff] ${color} items-center border-2 p-3 rounded-2xl shadow-md`}
    >
      {icon} <h1 className="text-2xl">{text}</h1>
    </div>
  );
}
