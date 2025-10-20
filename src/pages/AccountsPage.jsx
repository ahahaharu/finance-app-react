import React, { useState } from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import AccountCards from '../components/Accounts/Cards/AccountCards';
import {
  ArrowLeftRight,
  ClipboardClock,
  Plus,
  WalletMinimal,
} from 'lucide-react';
import Button from '../components/UI/Button';
import CreateAccountModal from '../components/Accounts/Modal/CreateAccountModal';
import TransferModal from '../components/Accounts/Modal/TransferModal';
import TransferHistoryModal from '../components/Accounts/Modal/TransferHistoryModal';

export default function AccountsPage() {
  const [createAccountModalOpen, setCreateAccountModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferHistoryModalOpen, setTransferHistoryModalOpen] =
    useState(false);

  return (
    <Wrapper>
      <div className="my-7">
        <div className="flex gap-2 items-center justify-center">
          <WalletMinimal size={30} />
          <span className="text-xl">Total Balance</span>
        </div>
        <Balance />
      </div>
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
        <Button
          icon={<ClipboardClock />}
          onClick={() => setTransferHistoryModalOpen(true)}
        >
          Transfer History
        </Button>
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
      <TransferHistoryModal
        title={'Transfer History'}
        isOpen={transferHistoryModalOpen}
        onCancel={() => setTransferHistoryModalOpen(false)}
      />
    </Wrapper>
  );
}
