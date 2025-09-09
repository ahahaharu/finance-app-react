import React from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import HomeStats from '../components/Home/Stats/HomeStats';

export default function HomePage() {
  return (
    <Wrapper>
      <Balance />
      <HomeStats />
    </Wrapper>
  );
}
