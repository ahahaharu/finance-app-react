import { DatePicker, Modal } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

export default function PeriodPickerModal({
  title,
  isOpen,
  onCancel,
  handleOk,
}) {
  const [selectedRange, setSelectedRange] = useState(null);

  const onRangeChange = (dates, dateStrings) => {
    setSelectedRange(dates);
    console.log('Selected Range:', dateStrings);
  };

  const onOk = () => {
    if (selectedRange && selectedRange.length === 2) {
      handleOk(selectedRange);
    } else {
      console.log('Please select a valid date range');
    }
  };

  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={onCancel}
      onOk={onOk}
      okButtonProps={{ disabled: !selectedRange || selectedRange.length !== 2 }}
      style={{ minWidth: '400px' }}
    >
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <RangePicker
          format="DD-MM-YYYY"
          onChange={onRangeChange}
          style={{ width: '100%', marginBottom: '20px' }}
          placeholder={['Start Date', 'End Date']}
          disabledDate={(current) => current && current > moment().endOf('day')}
        />
        {selectedRange && selectedRange.length === 2 && (
          <p style={{ color: '#1890ff', fontSize: '16px' }}>
            Selected Period: {selectedRange[0].format('DD-MM-YYYY')} to{' '}
            {selectedRange[1].format('DD-MM-YYYY')}
          </p>
        )}
      </div>
    </Modal>
  );
}
