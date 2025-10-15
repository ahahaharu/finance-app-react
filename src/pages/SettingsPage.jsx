import React from 'react';
import Wrapper from '../components/Wrapper/Wrapper';
import { Select } from 'antd';
import { useSettings } from '../context/SettingsContext';

const currencies = ['USD', 'BYN', 'EUR'];

export default function SettingsPage() {
  const { currentCurrency, changeCurrency } = useSettings();

  const handleCurrecySelectChange = (value) => {
    changeCurrency(value);
  };

  return (
    <Wrapper>
      <div className="w-full mt-5 p-7 border-2 rounded-2xl shadow-lg flex flex-col items-start justify-center">
        <div className="flex gap-3 text-black items-center">
          <span>Default Currency:</span>
          <Select
            defaultValue={currentCurrency}
            onChange={handleCurrecySelectChange}
          >
            {currencies.map((currency) => (
              <Select.Option value={currency}>{currency}</Select.Option>
            ))}
          </Select>
        </div>
      </div>
    </Wrapper>
  );
}
