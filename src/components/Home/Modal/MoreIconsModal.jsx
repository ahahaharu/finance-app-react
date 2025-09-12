import { Modal } from 'antd';
import React, { useState } from 'react';
import { EXPENSE_ICONS } from '../../../constants/expenseConstants';

export default function MoreIconsModal({ title, isOpen, onCancel, setIcon }) {
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  function handleOk() {
    setIcon(selectedIcon);
    onCancel();
  }

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={handleOk}>
      <div className="flex flex-wrap gap-3">
        {Object.keys(EXPENSE_ICONS).map((iconName) => (
          <div
            key={iconName}
            className={`p-2 rounded cursor-pointer hover:bg-sky-50 ${
              selectedIcon === iconName
                ? 'ring-2 ring-offset-2 ring-blue-500 bg-sky-200'
                : ''
            }`}
            onClick={() => handleIconClick(iconName)}
          >
            {EXPENSE_ICONS[iconName]}
          </div>
        ))}
      </div>
    </Modal>
  );
}
