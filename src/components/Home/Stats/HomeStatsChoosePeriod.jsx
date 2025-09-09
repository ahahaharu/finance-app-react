import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export default function HomeStatsChoosePeriod() {
  return (
    <div className="flex items-center text-black mt-5">
      <ChevronLeft size={20} className="cursor-pointer" />
      Today, 09 Aug
      <ChevronRight size={20} className="cursor-pointer" />
    </div>
  );
}
