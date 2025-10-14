import React, { useState } from 'react';
import { useAccounts } from '../../../context/AccountsContext';
import AccountCard from './AccountCard';

export default function AccountCards() {
  const { accounts } = useAccounts();
  return (
    <div className="flex flex-col gap-2 my-2">
      {accounts.map((account) => (
        <AccountCard account={account} />
      ))}
    </div>
  );
}
