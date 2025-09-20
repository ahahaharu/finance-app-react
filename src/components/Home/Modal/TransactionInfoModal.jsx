import { Button, Modal } from 'antd';
import React from 'react';
import { useCategories } from '../../../context/CategoryContext';
import getIconComponent from '../../../utils/getIconComponent';

export default function TransactionInfoModal({
  title,
  isOpen,
  onCancel,
  transaction,
}) {
  const { category, amount, currency, account, date } = transaction;
  const { getCategoryByName } = useCategories();
  const categoryObject = getCategoryByName(category);

  const getDate = () => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleAfterClose = () => {
    // Эта функция будет вызвана после завершения анимации закрытия
    // Здесь можно выполнить дополнительные действия, если необходимо
    console.log('Modal is closed now');
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      afterClose={handleAfterClose}
      footer={[
        <Button danger>Delete transaction</Button>,
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
      <h2>Date:</h2>
      <div className="text-lg text-blue-500">{getDate()}</div>
    </Modal>
  );
}
