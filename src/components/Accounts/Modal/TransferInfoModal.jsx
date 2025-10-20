import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useCategories } from '../../../context/CategoryContext';
import { getAccountIconComponent } from '../../../utils/getIconComponent';
import { Pencil, Trash } from 'lucide-react';
import { useTransactions } from '../../../context/TransactionsContext';
import { useAccounts } from '../../../context/AccountsContext';
import TransferModal from './TransferModal';

export default function TransferInfoModal({
  title,
  isOpen,
  onCancel,
  transfer,
}) {
  const { from, to, amount, currency, date, comment } = transfer;
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const { removeTransfer } = useTransactions();
  const { getAccountById } = useAccounts();

  const fromAccount = getAccountById(from);
  const toAccount = getAccountById(to);

  const getDate = () => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleTransferDelete = () => {
    removeTransfer(transfer.id);
    onCancel();
  };

  const handleTransferEdit = () => {
    setIsEditMode(true);
    setInitialData(transfer);
    setTransferModalOpen(true);
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          danger
          onClick={handleTransferDelete}
          icon={<Trash size={15} />}
        >
          Delete
        </Button>,
        <Button icon={<Pencil size={15} />} onClick={handleTransferEdit}>
          Edit
        </Button>,
        <Button type="primary" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <h2>From:</h2>
      <div className="flex gap-2" style={{ color: fromAccount.color }}>
        {getAccountIconComponent(fromAccount.icon)}
        <span>{fromAccount.name}</span>
      </div>
      <h2>To:</h2>
      <div className="flex gap-2" style={{ color: toAccount.color }}>
        {getAccountIconComponent(toAccount.icon)}
        <span>{toAccount.name}</span>
      </div>
      <h2>Amount:</h2>
      <div className="text-lg text-blue-500">
        <span className="font-bold mr-1">{amount}</span>
        {currency}
      </div>
      {comment ? (
        <>
          <h2>Comment</h2>
          <p className="text-blue-500">{comment}</p>
        </>
      ) : (
        ''
      )}
      <h2>Date:</h2>
      <div className="text-lg text-blue-500">{getDate()}</div>

      {transferModalOpen && (
        <TransferModal
          isOpen={transferModalOpen}
          onCancel={() => setTransferModalOpen(false)}
          isEditMode={isEditMode}
          initialData={initialData}
        />
      )}
    </Modal>
  );
}
