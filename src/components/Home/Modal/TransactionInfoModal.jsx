import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useCategories } from '../../../context/CategoryContext';
import { getIconComponent } from '../../../utils/getIconComponent';
import { Pencil, Trash } from 'lucide-react';
import AdditionalModal from './AdditionalModal';
import { useTransactions } from '../../../context/TransactionsContext';
import { useAccounts } from '../../../context/AccountsContext';

export default function TransactionInfoModal({
  title,
  isOpen,
  onCancel,
  transaction,
}) {
  const { category, amount, currency, account, date, comment } = transaction;
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
  const { getCategoryById } = useCategories();
  const { removeTransaction } = useTransactions();
  const categoryObject = getCategoryById(category);
  const { getAccountById } = useAccounts();

  const getDate = () => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleTransactionDelete = () => {
    removeTransaction(transaction.id);
    onCancel();
  };

  const handleTransactionEdit = () => {
    setIsEditMode(true);
    setInitialData(transaction);
    setAdditionalModalOpen(true);
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button
          danger
          onClick={handleTransactionDelete}
          icon={<Trash size={15} />}
        >
          Delete
        </Button>,
        <Button icon={<Pencil size={15} />} onClick={handleTransactionEdit}>
          Edit
        </Button>,
        <Button type="primary" onClick={onCancel}>
          Close
        </Button>,
      ]}
    >
      <h2>Amount:</h2>
      <div className="text-lg text-blue-500">
        <span className="font-bold mr-1">{amount}</span>
        {currency}
      </div>
      <h2>Category:</h2>
      <div
        className="flex items-center gap-3 my-1"
        style={{ color: categoryObject.color }}
      >
        {getIconComponent(categoryObject.icon)}
        <h2 className="text-lg">{categoryObject.name}</h2>
      </div>
      <h2>Account:</h2>
      <div className="text-lg text-blue-500">
        {getAccountById(account).name}
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

      {additionalModalOpen && (
        <AdditionalModal
          title="Add Transaction"
          isOpen={additionalModalOpen}
          onCancel={() => setAdditionalModalOpen(false)}
          transactionType={transaction.type}
          isEditMode={isEditMode}
          initialData={initialData}
        />
      )}
    </Modal>
  );
}
