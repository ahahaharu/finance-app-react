import React, { useState } from 'react';
import { useAccounts } from '../../../context/AccountsContext';
import AccountCard from './AccountCard';
import CreateAccountModal from '../Modal/CreateAccountModal';

export default function AccountCards() {
  const { accounts } = useAccounts();
  const [createAccountModalOpen, setCreateAccountModalOpen] = useState();
  const [initialData, setInitialData] = useState();

  const openEditModal = (account) => {
    setCreateAccountModalOpen(true);
    setInitialData(account);
  };
  return (
    <div className="flex flex-col gap-2 my-2">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onClick={() => openEditModal(account)}
        />
      ))}
      {createAccountModalOpen && (
        <CreateAccountModal
          title={'Edit Account'}
          isOpen={createAccountModalOpen}
          onCancel={() => setCreateAccountModalOpen(false)}
          isEditMode={true}
          initialData={initialData}
        />
      )}
    </div>
  );
}
