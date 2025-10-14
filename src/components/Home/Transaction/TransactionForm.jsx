import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCategories } from '../../../context/CategoryContext';
import CategoryItem from '../Category/CategoryItem';
import { CircleEllipsis } from 'lucide-react';
import MoreCategoriesModal from '../Modal/MoreCategoriesModal';
import { useAccounts } from '../../../context/AccountsContext';
import { getAccountIconComponent } from '../../../utils/getIconComponent';
import { useTransactions } from '../../../context/TransactionsContext';

export default function TransactionForm({
  transactionType,
  form,
  selectedCategory,
  setSelectedCategory,
  handleSubmit,
  onCancel,
  isEditMode,
}) {
  const { categories } = useCategories();
  const { accounts } = useAccounts();
  const { getBalanceByAccount } = useTransactions();
  const [moreCategoriesModalOpen, setMoreCategoriesModalOpen] = useState(false);
  const [anotherCategorySelected, setAnotherCategorySelected] = useState(false);

  function isAnotherCategory() {
    if (!anotherCategorySelected) {
      return null;
    }

    const category = categories.find(
      (category) => category.id === anotherCategorySelected
    );
    if (categories.slice(0, 7).includes(category)) {
      return null;
    }

    return (
      <CategoryItem
        key={category.id}
        category={category}
        isSelected={selectedCategory === category.id}
        onClick={() => handleCategoryClick(anotherCategorySelected)}
      />
    );
  }

  useEffect(() => {
    if (anotherCategorySelected) {
      setSelectedCategory(anotherCategorySelected);
      form.setFieldsValue({ category: anotherCategorySelected });
    }
  }, [anotherCategorySelected]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    form.setFieldsValue({ category: categoryId });
  };

  const sliceEnd = isAnotherCategory() ? 6 : 7;

  return (
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      onFinish={handleSubmit}
      style={{ maxWidth: 600 }}
      className="w-full"
    >
      <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
        <Space.Compact style={{ width: '100%' }}>
          <Form.Item
            name="amount"
            rules={[{ required: true, message: 'Please input the Amount!' }]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Amount" />
          </Form.Item>
          <Form.Item
            name="currency"
            rules={[{ required: true, message: 'Please select Currency' }]}
            style={{ marginBottom: 0 }}
          >
            <Select placeholder="Сurrency" style={{ width: 120 }}>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="BYN">BYN</Select.Option>
            </Select>
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Account"
        name="account"
        rules={[{ required: true, message: 'Please select Account' }]}
        style={{ marginBottom: '20px' }}
      >
        <Select placeholder="Account" style={{ width: 275 }}>
          {accounts.map((account) => (
            <Select.Option value={account.id}>
              <div
                className="flex items-center justify-between"
                style={{ color: account.color }}
              >
                <div className="flex gap-2 items-center">
                  {getAccountIconComponent(account.icon)}
                  <span className="max-w-30 overflow-hidden text-ellipsis">
                    {account.name}
                  </span>
                </div>
                <span>{getBalanceByAccount(account.id)} USD</span>
              </div>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <div className="flex flex-wrap gap-3 justify-start">
          {isAnotherCategory()}
          {categories
            .filter((category) => category.type === transactionType)
            .slice(0, sliceEnd)
            .map((category) => (
              <CategoryItem
                key={category.name}
                category={category}
                isSelected={selectedCategory === category.id}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          <button
            type="button"
            className="flex flex-col items-center justify-center w-1/5 p-0.5 rounded cursor-pointer text-xs text-left hover:bg-sky-50 transition-all"
            style={{ color: '#6b7280' }}
            onClick={() => setMoreCategoriesModalOpen(true)}
          >
            <CircleEllipsis size={25} />
            <span className="text-center mt-1 w-full whitespace-nowrap overflow-hidden text-ellipsis">
              More
            </span>
          </button>
        </div>
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select Account' }]}
        style={{ marginBottom: '20px' }}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Comment"
        name="comment"
        style={{ marginBottom: '20px' }}
      >
        <Input placeholder="Comment" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
        <div className="flex justify-end gap-2">
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {isEditMode ? 'Edit' : 'Add'} Transaction
          </Button>
        </div>
      </Form.Item>
      {moreCategoriesModalOpen && (
        <MoreCategoriesModal
          title={'More Categories'}
          isOpen={moreCategoriesModalOpen}
          onCancel={() => setMoreCategoriesModalOpen(false)}
          selectCategory={setAnotherCategorySelected}
        />
      )}
    </Form>
  );
}
