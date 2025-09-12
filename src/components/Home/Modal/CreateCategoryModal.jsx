import { ColorPicker, Form, Input, Modal, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { COLORS, EXPENSE_ICONS } from '../../../constants/expenseConstants';
import { CircleEllipsis, Plus } from 'lucide-react';
import MoreIconsModal from './MoreIconsModal';
import { ChromePicker } from 'react-color';

const options = [
  { label: 'Expenses', value: 'Expenses' },
  { label: 'Income', value: 'Income' },
];

export default function CreateCategoryModal({ title, isOpen, onCancel }) {
  const [form] = Form.useForm();
  const [selectedIcon, setSelectedIcon] = useState('Utensils');
  const [moreIconsModalOpen, setMoreIconsModalOpen] = useState(false);
  const [anotherIconSelected, setAnotherIconSelected] = useState(false);
  const [selectedColor, setSelectedColor] = useState({ hex: COLORS.red });
  const [pickerOpened, setPickerOpened] = useState(false);
  const [isColorPickerColor, setIsColorPickerColor] = useState(false);

  console.log(Object.keys(COLORS));

  function isAnotherIcon() {
    if (!anotherIconSelected) {
      return false;
    }

    if (Object.keys(EXPENSE_ICONS).slice(0, 11).includes(anotherIconSelected)) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (anotherIconSelected) {
      setSelectedIcon(anotherIconSelected);
      form.setFieldsValue({ icon: anotherIconSelected });
    }
  }, [anotherIconSelected]);

  function handleSubmit(values) {
    console.log('Form values:', values);
    onCancel();
  }

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

  const sliceEnd = isAnotherIcon() ? 8 : 9;

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
          <div className="flex flex-wrap gap-2 justify-center">
            {isAnotherIcon() && (
              <div
                className={`flex flex-col items-center justify-center px-2 rounded cursor-pointer text-xs text-left hover:bg-sky-50 transition-all ${
                  selectedIcon === anotherIconSelected
                    ? 'ring-2 ring-offset-2 ring-blue-500 bg-sky-200'
                    : ''
                }`}
                style={{ color: '#000000' }}
                onClick={() => handleIconClick(anotherIconSelected)}
              >
                {EXPENSE_ICONS[anotherIconSelected]}
              </div>
            )}
            {Object.keys(EXPENSE_ICONS)
              .slice(0, sliceEnd)
              .map((iconName) => (
                <div
                  key={iconName}
                  className={`p-2 rounded cursor-pointer hover:bg-sky-50 transition-all ${
                    selectedIcon === iconName
                      ? 'ring-2 ring-offset-2 ring-blue-500 bg-sky-200'
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

        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: 'Please select a color!' }]}
        >
          <div className="flex flex-wrap gap-3 items- justify-center relative">
            {Object.keys(COLORS).map((colorKey) => (
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
              <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded shadow-lg">
                <ChromePicker
                  color={selectedColor.hex}
                  onChange={handleColorChange}
                  onChangeComplete={handleColorChangeComplete}
                />
                <button
                  onClick={() => setPickerOpened(false)}
                  className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </Form.Item>
      </Form>

      {moreIconsModalOpen && (
        <MoreIconsModal
          title={'More Icons'}
          isOpen={moreIconsModalOpen}
          onCancel={() => setMoreIconsModalOpen(false)}
          setIcon={setAnotherIconSelected}
        />
      )}
    </Modal>
  );
}
