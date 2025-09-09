import React from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import HomeStats from '../components/Home/Stats/HomeStats';
import { Apple, Bus, Dumbbell, Utensils } from 'lucide-react';
import SourceCards from '../components/Home/Cards/SourceCards';
import ToggleSources from '../components/Home/ToggleSources';

const data = [
  {
    id: 0,
    text: 'Cafe',
    icon: <Utensils />,
    color: 'text-red-400',
  },
  {
    id: 1,
    text: 'Transport',
    icon: <Bus />,
    color: 'text-blue-500',
  },
  {
    id: 2,
    text: 'Grocies',
    icon: <Apple />,
    color: 'text-green-400',
  },
  {
    id: 3,
    text: 'Workout',
    icon: <Dumbbell />,
    color: 'text-orange-400',
  },
];

export default function HomePage() {
  return (
    <Wrapper>
      <Balance />
      <ToggleSources />
      <HomeStats />
      <SourceCards data={data} />
    </Wrapper>
  );
}
