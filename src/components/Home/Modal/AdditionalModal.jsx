import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Tabs,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { CircleEllipsis } from 'lucide-react';
import CategoryItem from '../Category/CategoryItem';
import MoreCategoriesModal from './MoreCategoriesModal';
import { useCategories } from '../../../context/CategoryContext';
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
  isEditMode = false,
  initialData = null,
}) {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [transactionType, setTransactionType] = useState('Expense');

  const { addTransaction, editTransaction } = useTransactions();

  useEffect(() => {
    if (isOpen && isEditMode) {
      form.resetFields();
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

  const onChange = (key) => {
    setTransactionType(items.find((item) => item.key === key).label);
  };

  const handleSubmit = (values) => {
    console.log(values);
    const newTransaction = {
      amount: values.amount,
      type: transactionType,
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
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <TransactionForm
          transactionType={transactionType}
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
