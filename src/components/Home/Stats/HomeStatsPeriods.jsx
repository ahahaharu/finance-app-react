import React from 'react';
import HomeStatsPeriodsElement from './HomeStatsPeriodsElement';

export default function HomeStatsPeriods({ periodFilter, togglePeriodFilter }) {
  return (
    <ul className="flex gap-2">
      <HomeStatsPeriodsElement
        isActive={periodFilter === 'day'}
        onClick={() => togglePeriodFilter('day')}
      >
        Day
      </HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement
        isActive={periodFilter === 'week'}
        onClick={() => togglePeriodFilter('week')}
      >
        Week
      </HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement
        isActive={periodFilter === 'mounth'}
        onClick={() => togglePeriodFilter('mounth')}
      >
        Mounth
      </HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement
        isActive={periodFilter === 'year'}
        onClick={() => togglePeriodFilter('year')}
      >
        Year
      </HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement
        isActive={periodFilter === 'period'}
        onClick={() => togglePeriodFilter('period')}
      >
        Period
      </HomeStatsPeriodsElement>
    </ul>
  );
}
