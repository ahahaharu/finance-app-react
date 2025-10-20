import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useMemo } from 'react';
import moment from 'moment';

export default function HomeStatsChoosePeriod({
  periodFilter,
  offset,
  shiftPeriod,
  startDate,
  endDate,
}) {
  const periodRange = useMemo(() => {
    if (periodFilter === 'period' && startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      return `from ${start.format('D MMM YYYY')} to ${end.format(
        'D MMM YYYY'
      )}`;
    }

    const baseDate = moment();

    let unit;
    switch (periodFilter) {
      case 'day':
        unit = 'days';
        break;
      case 'week':
        unit = 'weeks';
        break;
      case 'month':
        unit = 'months';
        break;
      case 'year':
        unit = 'years';
        break;
      default:
        return '';
    }

    baseDate.add(unit, offset);

    switch (periodFilter) {
      case 'day':
        const today = moment();
        const yesterday = moment().subtract(1, 'day');
        let dayText = '';

        if (baseDate.isSame(today, 'day')) {
          dayText = 'Today';
        } else if (baseDate.isSame(yesterday, 'day')) {
          dayText = 'Yesterday';
        }

        return `${dayText} ${baseDate.format('DD MMMM')}`.trim();

      case 'week':
        const startOfWeek = moment(baseDate).startOf('isoWeek');
        const endOfWeek = moment(baseDate).endOf('isoWeek');
        return `from ${startOfWeek.format('D MMM')} to ${endOfWeek.format(
          'D MMM YYYY'
        )}`;

      case 'month':
        return baseDate.format('MMMM YYYY');

      case 'year':
        return baseDate.format('YYYY');

      default:
        return '';
    }
  }, [periodFilter, offset, startDate, endDate]);

  return (
    <div className="flex justify-between min-w-[220px] items-center text-black mt-5">
      <ChevronLeft
        size={20}
        className="cursor-pointer rounded-full hover:bg-indigo-50"
        onClick={() => shiftPeriod('left')}
      />
      {periodRange}
      <ChevronRight
        size={20}
        className="cursor-pointer rounded-full hover:bg-indigo-50"
        onClick={() => shiftPeriod('right')}
      />
    </div>
  );
}
