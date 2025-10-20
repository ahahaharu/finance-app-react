import React from 'react';
import TransactionSwitchButton from './TransactionSwitchButton';

export default function TransactionSwitch({
  transactionType,
  toggleTransaction,
}) {
  return (
    <div className="flex gap-3 w-full text-center justify-center mb-5 text-xl">
      <TransactionSwitchButton
        text={'Expense'}
        isActive={transactionType === 'expense'}
        onClick={() => toggleTransaction('expense')}
      />
      <TransactionSwitchButton
        text={'Income'}
        isActive={transactionType === 'income'}
        onClick={() => toggleTransaction('income')}
      />
    </div>
  );
}
