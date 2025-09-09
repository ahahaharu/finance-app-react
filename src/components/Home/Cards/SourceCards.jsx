import React from 'react';
import SourceCard from './SourceCard';

export default function SourceCards({ data }) {
  return (
    <div className="flex flex-col gap-2 my-5">
      {data.map((item) => (
        <SourceCard
          key={item.id}
          icon={item.icon}
          text={item.text}
          color={item.color}
        />
      ))}
    </div>
  );
}
