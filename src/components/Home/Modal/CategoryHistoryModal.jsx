import { Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import TransactionCard from '../Transaction/TransactionCard';
import TransactionInfoModal from './TransactionInfoModal';
import { useTransactions } from '../../../context/TransactionsContext';

export default function CategoryHistoryModal({
  title,
  isOpen,
  onCancel,
  categoryId,
}) {
  const { transactions } = useTransactions();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const groupedTransactionsByCategory = useMemo(() => {
    const transactionsByCategory = transactions.filter(
      (transaction) => transaction.category === categoryId
    );

    const sortedTransactions = [...transactionsByCategory].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

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

  const selectedTransaction = transactions.find(
    (exp) => exp.id === selectedTransactionId
  );

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={onCancel}>
      <div>
        {groupedTransactionsByCategory ? (
          Object.entries(groupedTransactionsByCategory).map(
            ([date, transactions]) => (
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
            )
          )
        ) : (
          <h2 className="text-lg text-center text-blue-500 my-5">
            There are no transactions for this period.
          </h2>
        )}
      </div>

      {selectedTransactionId && (
        <TransactionInfoModal
          key={selectedTransactionId}
          title="Transaction Info"
          isOpen={!!selectedTransactionId}
          onCancel={() => setSelectedTransactionId(null)}
          transaction={selectedTransaction}
        />
      )}
    </Modal>
  );
}
