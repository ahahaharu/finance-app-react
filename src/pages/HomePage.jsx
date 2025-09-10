import React from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import HomeStats from '../components/Home/Stats/HomeStats';
import { Apple, Bus, Dumbbell, Utensils } from 'lucide-react';
import SourceCards from '../components/Home/Cards/SourceCards';
import ToggleSources from '../components/Home/ToggleSources';

export default function HomePage() {
  return (
    <Wrapper>
      <Balance />
      <ToggleSources />
      <HomeStats />
      <SourceCards />
    </Wrapper>
  );
}
