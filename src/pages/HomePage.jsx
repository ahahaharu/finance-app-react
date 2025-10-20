import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Wrapper from '../components/Wrapper/Wrapper';
import Balance from '../components/Home/Balance';
import HomeStats from '../components/Home/Stats/HomeStats';
import SourceCards from '../components/Home/Cards/SourceCards';
import TransactionSwitch from '../components/TransactionSwitch/TransactionSwitch';
import PeriodPickerModal from '../components/Home/Modal/PeriodPickerModal';
import { ChevronDown, WalletMinimal } from 'lucide-react';
import AccountsModal from '../components/Home/Modal/AccountsModal';
import { getAccountIconComponent } from '../utils/getIconComponent';
import { useAccounts } from '../context/AccountsContext';

export default function HomePage() {
  const { accounts } = useAccounts();
  const [searchParams, setSearchParams] = useSearchParams();

  const transactionType = searchParams.get('transaction') || 'expense';
  const periodFilter = searchParams.get('filter') || 'week';
  const offset = parseInt(searchParams.get('offset') || '0', 10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountsModalOpen, setAccountsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(0);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams);
    if (
      !currentParams.transaction ||
      !currentParams.filter ||
      !currentParams.offset
    ) {
      setSearchParams(
        (prev) => {
          const newParams = {
            ...Object.fromEntries(prev),
            transaction: currentParams.transaction || 'expense',
            filter: currentParams.filter || 'week',
            offset: currentParams.offset || '0',
          };
          return newParams;
        },
        { replace: true }
      );
    }
  }, [searchParams, setSearchParams]);

  const openPeriodPicker = () => {
    setIsModalOpen(true);
  };

  const handlePeriodPickerClose = () => {
    setIsModalOpen(false);
    setSearchParams(
      (prev) => {
        const newParams = {
          ...Object.fromEntries(prev),
          filter: 'week',
          offset: '0',
        };
        return newParams;
      },
      { replace: true }
    );
  };

  const handlePeriodSelect = (selectedRange) => {
    if (selectedRange && selectedRange.length === 2) {
      const [start, end] = selectedRange;
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        filter: 'period',
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD'),
        offset: '0',
      }));
      setIsModalOpen(false);
      console.log(
        'Selected period:',
        start.format('YYYY-MM-DD'),
        'to',
        end.format('YYYY-MM-DD')
      );
    }
  };

  function toggleTransaction(newTransactionType) {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      transaction: newTransactionType,
    }));
  }

  function togglePeriodFilter(newPeriodFilter) {
    const newParams = {
      ...Object.fromEntries(searchParams),
      filter: newPeriodFilter,
      offset: '0',
    };

    if (newPeriodFilter !== 'period') {
      delete newParams.startDate;
      delete newParams.endDate;
    }

    setSearchParams(newParams);
    if (newPeriodFilter === 'period') {
      openPeriodPicker();
    }
  }

  function shiftPeriod(direction) {
    const step = direction === 'left' ? -1 : 1;
    const newOffset = offset + step;

    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      offset: newOffset.toString(),
    }));
  }

  return (
    <Wrapper>
      <div className="my-7">
        <div
          className="flex gap-1 justify-center"
          onClick={() => setAccountsModalOpen(true)}
        >
          <div className="flex px-2 rounded-lg items-center hover:bg-indigo-50 cursor-pointer gap-2">
            {selectedAccount === 0 ? (
              <div className="flex items-center gap-2">
                <WalletMinimal size={30} />
                <span className="text-xl">Total Balance</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div>
                  {getAccountIconComponent(accounts[selectedAccount - 1].icon)}
                </div>
                <span className="text-xl">
                  {accounts[selectedAccount - 1].name}
                </span>
              </div>
            )}

            <ChevronDown size={20} />
          </div>
        </div>
        <Balance
          accountId={
            selectedAccount != 0 ? accounts[selectedAccount - 1].id : null
          }
        />
      </div>
      <TransactionSwitch
        transactionType={transactionType}
        toggleTransaction={toggleTransaction}
      />
      <HomeStats
        periodFilter={periodFilter}
        togglePeriodFilter={togglePeriodFilter}
        offset={offset}
        shiftPeriod={shiftPeriod}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        openPeriodPicker={openPeriodPicker}
        transactionType={transactionType}
        accountId={
          selectedAccount != 0 ? accounts[selectedAccount - 1].id : null
        }
      />
      <SourceCards
        periodFilter={periodFilter}
        offset={offset}
        transactionType={transactionType}
        accountId={
          selectedAccount != 0 ? accounts[selectedAccount - 1].id : null
        }
      />
      <PeriodPickerModal
        title="Select Custom Period"
        isOpen={isModalOpen}
        onCancel={handlePeriodPickerClose}
        handleOk={handlePeriodSelect}
      />
      <AccountsModal
        isOpen={accountsModalOpen}
        onCancel={() => setAccountsModalOpen(false)}
        setSelectedAccount={setSelectedAccount}
      />
    </Wrapper>
  );
}
