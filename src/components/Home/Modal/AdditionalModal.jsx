import { Form, Input, Modal, Radio, Select, Space } from 'antd';
import React, { useState } from 'react';
import { CATEGORIES } from '../../../constants/expenseConstants';
import { CircleEllipsis } from 'lucide-react';
import CategoryItem from '../Category/CategoryItem';
import MoreCategoriesModal from './MoreCategoriesModal';

export default function AdditionalModal({ title, isOpen, onCancel }) {
  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [moreCategoriesModalOpen, setMoreCategoriesModalOpen] = useState(false);

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    onCancel();
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    form.setFieldsValue({ category: categoryName });
  };

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={handleSubmit}>
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Amount" name="amount">
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item
              name="amount"
              rules={[{ required: true, message: 'Please input the amount!' }]}
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="Amount" />
            </Form.Item>
            <Form.Item
              name="currency"
              rules={[{ required: true, message: 'Please select currency' }]}
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
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <div className="flex flex-wrap gap-3 justify-between">
            {CATEGORIES.slice(0, 7).map((category) => (
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
      </Form>

      {moreCategoriesModalOpen && (
        <MoreCategoriesModal
          title={'More Categories'}
          isOpen={moreCategoriesModalOpen}
          onCancel={() => setMoreCategoriesModalOpen(false)}
        />
      )}
    </Modal>
  );
}
