import { Button, Modal } from 'antd';
import { CircleAlert } from 'lucide-react';
import React from 'react';

export default function ConfirmModal({
  title,
  isOpen,
  content,
  onOk,
  onCancel,
}) {
  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <CircleAlert color="orange" size={35} />
          {title}
        </div>
      }
      open={isOpen}
      onCancel={onCancel}
      width={400}
      footer={[
        <Button onClick={onCancel}>Cancel</Button>,
        <Button type="primary" onClick={onOk}>
          Confirm
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
}
