import React from 'react';
import HomeStatsPeriodsElement from './HomeStatsPeriodsElement';

export default function HomeStatsPeriods() {
  return (
    <ul className="flex gap-2">
      <HomeStatsPeriodsElement active>Day</HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement>Mounth</HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement>Year</HomeStatsPeriodsElement>
      <HomeStatsPeriodsElement>Period</HomeStatsPeriodsElement>
    </ul>
  );
}
