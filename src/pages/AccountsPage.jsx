import React from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import AccountCards from '../components/Home/Cards/AccountCards';
import { ArrowLeftRight, Plus } from 'lucide-react';
import Button from '../components/UI/Button';

export default function AccountsPage() {
  return (
    <Wrapper>
      <Balance />
      <div className="w-full my-5 flex justify-center gap-8">
        <Button icon={<Plus />} primary>
          Add Account
        </Button>
        <Button icon={<ArrowLeftRight />}>Transfer</Button>
      </div>
      <AccountCards />
    </Wrapper>
  );
}
