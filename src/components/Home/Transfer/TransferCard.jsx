import React, { useState } from 'react';
import {
  getAccountIconComponent,
  getIconComponent,
} from '../../../utils/getIconComponent';
import { useCategories } from '../../../context/CategoryContext';
import TransactionInfoModal from '../Modal/TransactionInfoModal';
import { useAccounts } from '../../../context/AccountsContext';
import { ArrowBigRightDash, ArrowRight } from 'lucide-react';

export default function TransferCard({ transfer, onClick }) {
  const { from, to, amount, currency } = transfer;
  const { getAccountById } = useAccounts();
  const fromAccount = getAccountById(from);
  const toAccount = getAccountById(to);

  return (
    <div
      className="flex justify-between border-2 border-blue-500 rounded-xl p-3 items-center cursor-pointer hover:bg-sky-50"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-lg">
        <div
          className="flex items-center gap-2"
          style={{ color: fromAccount.color }}
        >
          {getAccountIconComponent(fromAccount.icon)}
          {fromAccount.name}
        </div>
        <ArrowBigRightDash size={20} style={{ color: 'grey' }} />
        <div
          className="flex items-center gap-2"
          style={{ color: toAccount.color }}
        >
          {getAccountIconComponent(toAccount.icon)}
          {toAccount.name}
        </div>
      </div>
      <div className="text-lg text-blue-500">
        <span className="font-bold">{amount}</span> {currency}
      </div>
    </div>
  );
}
