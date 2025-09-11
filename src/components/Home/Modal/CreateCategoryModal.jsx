import { Form, Input, Modal, Radio } from 'antd';
import React, { useState } from 'react';
import { EXPENSE_ICONS } from '../../../constants/expenseConstants';
import { CircleEllipsis } from 'lucide-react';
import MoreIconsModal from './MoreIconsModal';

const options = [
  { label: 'Expenses', value: 'Expenses' },
  { label: 'Income', value: 'Income' },
];

export default function CreateCategoryModal({ title, isOpen, onCancel }) {
  const [form] = Form.useForm();
  const [selectedIcon, setSelectedIcon] = useState('Utensils');
  const [moreIconsModalOpen, setMoreIconsModalOpen] = useState(false);

  function handleSubmit(values) {
    console.log('Form values:', values);
    onCancel();
  }

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    form.setFieldsValue({ icon: iconName });
  };

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={onCancel}>
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: 'Please input category name' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input placeholder="Category Name" />
        </Form.Item>

        <Form.Item label="Type" name="type" style={{ marginBottom: '20px' }}>
          <Radio.Group
            block
            options={options}
            defaultValue="Expenses"
            optionType="button"
          />
        </Form.Item>

        <Form.Item
          label="Icon"
          name="icon"
          rules={[{ required: true, message: 'Please select an icon!' }]}
        >
          <div className="flex flex-wrap gap-3">
            {Object.keys(EXPENSE_ICONS)
              .slice(0, 11)
              .map((iconName) => (
                <div
                  key={iconName}
                  className={`p-2 rounded cursor-pointer hover:bg-sky-50 ${
                    selectedIcon === iconName
                      ? 'border border-blue-500 bg-sky-200'
                      : ''
                  }`}
                  onClick={() => handleIconClick(iconName)}
                >
                  {EXPENSE_ICONS[iconName]}
                </div>
              ))}
            <button
              type="button"
              className="flex flex-col items-center justify-center px-2 rounded cursor-pointer text-xs text-left hover:bg-sky-50 transition-all"
              style={{ color: '#6b7280' }}
              onClick={() => {
                setMoreIconsModalOpen(true);
              }}
            >
              <CircleEllipsis size={25} />
              <span className="text-center w-full whitespace-nowrap overflow-hidden text-ellipsis">
                More
              </span>
            </button>
          </div>
        </Form.Item>
      </Form>

      {moreIconsModalOpen && (
        <MoreIconsModal
          title={'More Icons'}
          isOpen={moreIconsModalOpen}
          onCancel={() => setMoreIconsModalOpen(false)}
        />
      )}
    </Modal>
  );
}
