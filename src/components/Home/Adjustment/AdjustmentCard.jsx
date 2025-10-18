import React, { useState } from 'react';
import {
  getAccountIconComponent,
  getIconComponent,
} from '../../../utils/getIconComponent';
import { useAccounts } from '../../../context/AccountsContext';
import { ArrowBigRightDash, ArrowRight, PencilLine } from 'lucide-react';

export default function AdjustmentCard({ adjustment, onClick }) {
  const { account, amount, currency } = adjustment;
  const { getAccountById } = useAccounts();
  const adjustmentAccount = getAccountById(account);

  return (
    <div
      className="flex justify-between border-2 border-blue-500 rounded-xl p-3 items-center "
      onClick={onClick}
    >
      <div className="flex items-center gap-2 text-lg">
        <PencilLine size={15} style={{ color: 'grey' }} />
        <div
          className="flex items-center gap-2"
          style={{ color: adjustmentAccount.color }}
        >
          {getAccountIconComponent(adjustmentAccount.icon)}
          {adjustmentAccount.name}
        </div>
      </div>
      <div className="text-lg text-blue-500">
        <span className="font-bold">{amount.toFixed(2)}</span> {currency}
      </div>
    </div>
  );
}
