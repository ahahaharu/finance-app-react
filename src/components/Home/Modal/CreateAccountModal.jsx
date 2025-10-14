import { Button, Form, Input, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  ACCOUNTS_ICONS,
  COLORS,
} from '../../../constants/transactionsConstants';
import { CircleEllipsis, Plus } from 'lucide-react';
import { ChromePicker } from 'react-color';
import { useAccounts } from '../../../context/AccountsContext';

export default function CreateAccountModal({
  title,
  isOpen,
  onCancel,
  isEditMode = false,
  initialData = null,
}) {
  const [form] = Form.useForm();
  const [selectedIcon, setSelectedIcon] = useState('Card');
  const [selectedColor, setSelectedColor] = useState({ hex: COLORS.red });
  const [pickerOpened, setPickerOpened] = useState(false);
  const [isColorPickerColor, setIsColorPickerColor] = useState(false);
  const { addAccount, editAccount, removeAccount } = useAccounts();

  useEffect(() => {
    if (isOpen && isEditMode) {
      form.resetFields();
      form.setFieldsValue({
        accountName: initialData.name,
        icon: initialData.icon,
        color: initialData.color,
      });
      setSelectedIcon(initialData.icon);
      setSelectedColor({ hex: COLORS[initialData.color] });
    }
  }, [isOpen]);

  function handleSubmit(values) {
    console.log('Form values:', values);
    const newAccount = {
      name: values.accountName,
      icon: values.icon,
      color: values.color,
    };
    if (isEditMode) {
      editAccount(initialData.id, newAccount);
    } else {
      addAccount(newAccount);
    }
    onCancel();
  }

  function handleDelete() {
    removeAccount(initialData.id);
    onCancel();
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Validation failed:', errorInfo);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    form.setFieldsValue({ icon: iconName });
  };

  const handleColorClick = (colorKey) => {
    const newColor = { hex: COLORS[colorKey] };
    setSelectedColor(newColor);
    setIsColorPickerColor(false);
    form.setFieldsValue({ color: colorKey });
  };

  const handleColorChange = (color) => {
    setIsColorPickerColor(true);
    setSelectedColor(color);
  };

  const handleColorChangeComplete = (color) => {
    form.setFieldsValue({ color: color.hex });
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      onOk={onCancel}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
        initialValues={{
          type: 'Expenses',
          icon: 'Utensils',
          color: 'red',
        }}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="Account Name"
          name="accountName"
          rules={[{ required: true, message: 'Please input account name' }]}
          style={{ marginBottom: '20px' }}
        >
          <Input placeholder="Account Name" />
        </Form.Item>
        <Form.Item
          label="Icon"
          name="icon"
          rules={[{ required: true, message: 'Please select an icon!' }]}
        >
          <div className="flex flex-wrap gap-2">
            {Object.keys(ACCOUNTS_ICONS).map((iconName) => (
              <div
                key={iconName}
                className={`p-2 rounded cursor-pointer hover:bg-sky-50 transition-all ${
                  selectedIcon === iconName
                    ? 'ring-2 ring-offset-2 ring-blue-500 bg-sky-200'
                    : ''
                }`}
                onClick={() => handleIconClick(iconName)}
              >
                {ACCOUNTS_ICONS[iconName]}
              </div>
            ))}
          </div>
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please select a color!' }]}
        >
          <div className="flex flex-wrap gap-3 items- justify-center relative">
            {Object.keys(COLORS)
              .slice(0, 7)
              .map((colorKey) => (
                <div
                  key={colorKey}
                  className={`w-5 h-5 rounded-full cursor-pointer ${
                    selectedColor.hex === COLORS[colorKey]
                      ? 'ring-2 ring-offset-2'
                      : ''
                  }`}
                  style={{ backgroundColor: COLORS[colorKey] }}
                  onClick={() => handleColorClick(colorKey)}
                />
              ))}
            <div
              className={`w-5 h-5 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:border-gray-600 ${
                isColorPickerColor ? 'ring-2 ring-offset-2' : ''
              }`}
              onClick={() => setPickerOpened(!pickerOpened)}
              style={
                isColorPickerColor
                  ? { backgroundColor: selectedColor.hex, borderColor: '#000' }
                  : {}
              }
            >
              <Plus size={12} />
            </div>
            {pickerOpened && (
              <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-lg shadow-xl border-2 border-blue-500">
                <ChromePicker
                  color={selectedColor.hex}
                  onChange={handleColorChange}
                  onChangeComplete={handleColorChangeComplete}
                />
                <Button
                  type="primary"
                  className="w-full mt-2"
                  onClick={() => setPickerOpened(false)}
                >
                  Select color
                </Button>
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
          <div className="flex justify-end gap-2">
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>
            {isEditMode && (
              <Button danger onClick={handleDelete}>
                Delete Account
              </Button>
            )}
            <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
              {isEditMode ? 'Edit Account' : 'Add Account'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
