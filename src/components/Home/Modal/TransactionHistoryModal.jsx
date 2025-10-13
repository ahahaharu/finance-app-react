import { Modal } from 'antd';
import React, { useState } from 'react';
import TransactionCard from '../Transaction/TransactionCard';
import TransactionInfoModal from './TransactionInfoModal';
import { useTransactions } from '../../../context/TransactionsContext';

export default function TransactionHistoryModal({
  title,
  isOpen,
  onCancel,
  transactionType,
}) {
  const { transactions } = useTransactions();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const groupedTransactions = React.useMemo(() => {
    const sortedTransactions = transactions
      .filter((trans) => trans.type.toLowerCase() === transactionType)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {});
  }, [transactions]);

  const handleModalClose = () => {
    setSelectedTransactionId(null);
  };

  const selectedTransaction = transactions.find(
    (exp) => exp.id === selectedTransactionId
  );

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={onCancel}>
      <div>
        {groupedTransactions.length != 0 ? (
          Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="mb-4">
              <h2 className="font-bold mb-1">{date}</h2>
              <div className="flex flex-col gap-2">
                {transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() => setSelectedTransactionId(transaction.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-lg text-center text-blue-500 my-5">
            There are no transactions for this period.
          </h2>
        )}
      </div>

      {selectedTransactionId && (
        <TransactionInfoModal
          key={selectedTransaction.id}
          title="Transaction Info"
          isOpen={!!selectedTransactionId}
          onCancel={handleModalClose}
          transaction={selectedTransaction}
        />
      )}
    </Modal>
  );
}
