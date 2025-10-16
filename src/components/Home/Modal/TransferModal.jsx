import { Form, Modal, Space, Select, Input, DatePicker, Button } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useAccounts } from '../../../context/AccountsContext';
import { getAccountIconComponent } from '../../../utils/getIconComponent';
import { useTransactions } from '../../../context/TransactionsContext';
import { useSettings } from '../../../context/SettingsContext';

export default function TransferModal({
  isOpen,
  onCancel,
  isEditMode = false,
}) {
  const [form] = Form.useForm();
  const { accounts } = useAccounts();
  const { currencies, currentCurrency } = useSettings();
  const { addTransfer, getBalanceByAccount } = useTransactions();

  const fromAccountId = Form.useWatch('from', form);
  const toAccountId = Form.useWatch('to', form);

  const filteredFromAccounts = useMemo(() => {
    return accounts.filter((account) => account.id !== toAccountId);
  }, [accounts, toAccountId]);

  const filteredToAccounts = useMemo(() => {
    return accounts.filter((account) => account.id !== fromAccountId);
  }, [accounts, fromAccountId]);

  useEffect(() => {
    if (
      toAccountId &&
      !filteredFromAccounts.some((acc) => acc.id === fromAccountId)
    ) {
      form.setFieldValue('from', undefined);
    }
    if (
      fromAccountId &&
      !filteredToAccounts.some((acc) => acc.id === toAccountId)
    ) {
      form.setFieldValue('to', undefined);
    }
  }, [
    fromAccountId,
    toAccountId,
    form,
    filteredFromAccounts,
    filteredToAccounts,
  ]);

  const handleSubmit = (values) => {
    console.log(values);
    const newTransfer = {
      from: values.from,
      to: values.to,
      amount: values.amount,
      currency: values.currency,
      date: values.date.toISOString(),
      comment: values.comment,
    };
    if (isEditMode) {
      addTransfer(initialData.id, newTransfer);
    } else {
      addTransfer(newTransfer);
    }

    onCancel();
  };

  return (
    <Modal
      title={`${isEditMode ? 'Edit' : 'Make'} Transfer`}
      open={isOpen}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={450}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        style={{ width: 400 }}
        className="w-full"
      >
        <Form.Item
          label="From"
          name="from"
          rules={[{ required: true, message: 'Please select Account' }]}
        >
          <Select placeholder="From Account" style={{ width: 275 }}>
            {filteredFromAccounts.map((account) => (
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
                  <span>
                    {getBalanceByAccount(account.id)} {currentCurrency}
                  </span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="To"
          name="to"
          rules={[{ required: true, message: 'Please select Account' }]}
        >
          <Select placeholder="To Account" style={{ width: 275 }}>
            {filteredToAccounts.map((account) => (
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
                  <span>
                    {getBalanceByAccount(account.id)} {currentCurrency}
                  </span>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item
              name="amount"
              rules={[{ required: true, message: 'Please input the Amount!' }]}
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="Amount" style={{ width: 155 }} />
            </Form.Item>
            <Form.Item
              name="currency"
              rules={[{ required: true, message: 'Please select Currency' }]}
              style={{ marginBottom: 0 }}
            >
              <Select placeholder="Сurrency" style={{ width: 120 }}>
                {currencies.map((currency) => (
                  <Select.Option value={currency}>{currency}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select Account' }]}
        >
          <DatePicker style={{ width: 275 }} />
        </Form.Item>

        <Form.Item label="Comment" name="comment">
          <Input placeholder="Comment" style={{ width: 275 }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 7, span: 14 }}>
          <div className="flex justify-end gap-2">
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditMode ? 'Edit' : 'Make'} Transfer
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
