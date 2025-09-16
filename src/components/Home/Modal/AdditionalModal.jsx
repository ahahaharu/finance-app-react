import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { CircleEllipsis } from 'lucide-react';
import CategoryItem from '../Category/CategoryItem';
import MoreCategoriesModal from './MoreCategoriesModal';
import { useCategories } from '../../../context/CategoryContext';
import { useExpenses } from '../../../context/ExpensesContext';

export default function AdditionalModal({ title, isOpen, onCancel }) {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [moreCategoriesModalOpen, setMoreCategoriesModalOpen] = useState(false);
  const [anotherCategorySelected, setAnotherCategorySelected] = useState(false);
  const { categories } = useCategories();
  const { addExpense } = useExpenses();

  function isAnotherCategory() {
    if (!anotherCategorySelected) {
      return null;
    }

    const category = categories.find(
      (category) => category.name === anotherCategorySelected
    );
    if (categories.slice(0, 7).includes(category)) {
      return null;
    }

    return (
      <CategoryItem
        key={category.name}
        category={category}
        isSelected={selectedCategory === category.name}
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

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    onCancel();
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    form.setFieldsValue({ category: categoryName });
  };

  const sliceEnd = isAnotherCategory() ? 6 : 7;

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      onOk={handleSubmit}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
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
                <Select.Option value="usd">USD</Select.Option>
                <Select.Option value="eur">EUR</Select.Option>
                <Select.Option value="byn">BYN</Select.Option>
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
          <Select placeholder="Account" style={{ width: 120 }}>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="card">Card</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <div className="flex flex-wrap gap-3 justify-start">
            {isAnotherCategory()}
            {categories.slice(0, sliceEnd).map((category) => (
              <CategoryItem
                key={category.name}
                category={category}
                isSelected={selectedCategory === category.name}
                onClick={() => handleCategoryClick(category.name)}
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
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Add Transaction
            </Button>
          </div>
        </Form.Item>
      </Form>

      {moreCategoriesModalOpen && (
        <MoreCategoriesModal
          title={'More Categories'}
          isOpen={moreCategoriesModalOpen}
          onCancel={() => setMoreCategoriesModalOpen(false)}
          selectCategory={setAnotherCategorySelected}
        />
      )}
    </Modal>
  );
}
