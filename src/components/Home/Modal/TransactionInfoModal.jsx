import { Button, Modal } from 'antd';
import React from 'react';
import { useCategories } from '../../../context/CategoryContext';
import getIconComponent from '../../../utils/getIconComponent';
import { useExpenses } from '../../../context/ExpensesContext';

export default function TransactionInfoModal({
  title,
  isOpen,
  onCancel,
  transaction,
}) {
  const { category, amount, currency, account, date, comment } = transaction;
  const { getCategoryByName } = useCategories();
  const { removeExpense } = useExpenses();
  const categoryObject = getCategoryByName(category);

  const getDate = () => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleTransactionDelete = () => {
    removeExpense(transaction.id);
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button danger onClick={handleTransactionDelete}>
          Delete transaction
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
        className="flex items-center gap-3 mb-4"
        style={{ color: categoryObject.color }}
      >
        {getIconComponent(categoryObject.icon)}
        <h2 className="text-lg">{categoryObject.name}</h2>
      </div>
      <h2>Account:</h2>
      <div className="text-lg text-blue-500">{account}</div>
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
    </Modal>
  );
}
