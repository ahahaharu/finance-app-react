import { Form, Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useTransactions } from '../../../context/TransactionsContext';
import TransactionForm from '../Transaction/TransactionForm';

const items = [
  {
    key: '1',
    label: 'Expense',
  },
  {
    key: '2',
    label: 'Income',
  },
];

export default function AdditionalModal({
  isOpen,
  onCancel,
  transactionType,
  isEditMode = false,
  initialData = null,
}) {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentTransactionType, setCurrentTransactionType] =
    useState(transactionType);
  console.log(currentTransactionType);

  const { addTransaction, editTransaction } = useTransactions();

  useEffect(() => {
    if (isOpen && isEditMode) {
      form.resetFields();
      setCurrentTransactionType(transactionType);
      form.setFieldsValue({
        amount: initialData.amount,
        currency: initialData.currency,
        account: initialData.account,
        category: initialData.category,
        date: dayjs(initialData.date),
        comment: initialData.comment,
      });
      setSelectedCategory(initialData.category);
    }
  }, [isOpen]);

  const getActiveTabKey = () => {
    return (
      items.find((item) => item.label === currentTransactionType)?.key || '1'
    );
  };

  const onChange = (key) => {
    console.log(key);
    setCurrentTransactionType(items.find((item) => item.key === key).label);
  };

  const handleSubmit = (values) => {
    console.log(values);
    const newTransaction = {
      amount: values.amount,
      type: currentTransactionType,
      currency: values.currency,
      date: values.date.toISOString(),
      account: values.account,
      category: values.category,
      comment: values.comment,
    };
    if (isEditMode) {
      editTransaction(initialData.id, newTransaction);
    } else {
      addTransaction(newTransaction);
    }

    onCancel();
  };

  return (
    <Modal
      title={`${isEditMode ? 'Edit' : 'Add'} Transaction`}
      open={isOpen}
      onCancel={onCancel}
      onOk={handleSubmit}
      footer={null}
    >
      <div className="flex flex-col items-center">
        <Tabs activeKey={getActiveTabKey()} items={items} onChange={onChange} />
        <TransactionForm
          currentTransactionType={currentTransactionType}
          form={form}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleSubmit={handleSubmit}
          onCancel={onCancel}
          isEditMode={isEditMode}
        />
      </div>
    </Modal>
  );
}
