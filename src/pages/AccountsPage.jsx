import React, { useState } from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import AccountCards from '../components/Home/Cards/AccountCards';
import { ArrowLeftRight, ClipboardClock, Plus } from 'lucide-react';
import Button from '../components/UI/Button';
import CreateAccountModal from '../components/Home/Modal/CreateAccountModal';
import TransferModal from '../components/Home/Modal/TransferModal';

export default function AccountsPage() {
  const [createAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  return (
    <Wrapper>
      <Balance />
      <div className="w-full my-5 flex justify-center gap-8">
        <Button
          icon={<Plus />}
          onClick={() => setCreateAccountModalOpen(true)}
          primary
        >
          Add Account
        </Button>
        <Button
          icon={<ArrowLeftRight />}
          onClick={() => setTransferModalOpen(true)}
        >
          Transfer
        </Button>
        <Button icon={<ClipboardClock />}>History</Button>
      </div>
      <AccountCards />
      <CreateAccountModal
        title={'Create Account'}
        isOpen={createAccountModalOpen}
        onCancel={() => setCreateAccountModalOpen(false)}
      />
      <TransferModal
        isOpen={transferModalOpen}
        onCancel={() => setTransferModalOpen(false)}
      />
    </Wrapper>
  );
}
