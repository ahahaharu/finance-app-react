import { Button, Flex, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { useAccounts } from '../../../context/AccountsContext';
import AccountCard from '../Cards/AccountCard';
import { getAccountIconComponent } from '../../../utils/getIconComponent';
import { useTransactions } from '../../../context/TransactionsContext';
import { useSettings } from '../../../context/SettingsContext';
import { WalletMinimal } from 'lucide-react';

const style = {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
  margin: 20,
};

export default function AccountsModal({
  isOpen,
  onCancel,
  setSelectedAccount,
}) {
  const [value, setValue] = useState(0);
  const { accounts } = useAccounts();
  const { getBalanceByAccount, getBalanceByPeriod } = useTransactions();
  const { currentCurrency } = useSettings();
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = () => {
    setSelectedAccount(value);
    onCancel();
  };

  const radioOptions = [
    {
      value: 0,
      label: (
        <div className="flex w-100 p-3 rounded-2xl justify-between items-center hover:bg-indigo-50">
          <div key={0} className="flex gap-2 items-center text-xl">
            <WalletMinimal size={30} /> Total
          </div>
          <div className="text-lg">
            {getBalanceByPeriod()}
            {currentCurrency}
          </div>
        </div>
      ),
    },
    ...accounts.map((account, index) => ({
      value: index + 1,
      label: (
        <div
          className="flex w-100 p-3 rounded-2xl justify-between items-center hover:bg-indigo-50"
          style={{ color: account.color }}
        >
          <div key={account.id} className="flex gap-2 items-center text-xl">
            {getAccountIconComponent(account.icon)} {account.name}
          </div>
          <div className="text-lg">
            {getBalanceByAccount(account.id)} {currentCurrency}
          </div>
        </div>
      ),
    })),
  ];

  console.log(accounts);
  return (
    <Modal
      title="Choose Account"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button onClick={onCancel}>Cancel</Button>,
        <Button type="primary" onClick={handleSelect}>
          Select Account
        </Button>,
      ]}
    >
      <Radio.Group
        onChange={onChange}
        value={value}
        style={style}
        options={radioOptions}
      />
    </Modal>
  );
}
