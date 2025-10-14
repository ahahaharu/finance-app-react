import React from 'react';
import getIconComponent from '../../../utils/getIconComponent';
import { useTransactions } from '../../../context/TransactionsContext';

export default function AccountCard({ account, onClick }) {
  const { getBalanceByAccount } = useTransactions();

  const styleColor = account.color;
  return (
    <div
      className="flex justify-between items-center border-[#1677ff] border-2 p-3 rounded-2xl shadow-md hover:bg-sky-50 cursor-pointer"
      onClick={onClick}
    >
      <div
        style={{ color: styleColor }}
        className={`flex gap-3  items-center `}
      >
        {getIconComponent(account.icon)}{' '}
        <h1 className="text-2xl">{account.name}</h1>
      </div>
      <div className="text-lg">{getBalanceByAccount(account.id)} USD</div>
    </div>
  );
}
