import React, { useState } from 'react';
import { useTransactions } from '../../../context/TransactionsContext';
import { Modal } from 'antd';
import TransferCard from '../Transfer/TransferCard';

export default function TransferHistoryModal({ title, isOpen, onCancel }) {
  const { transactions } = useTransactions();
  const [selectedTransferId, setSelectedTransferId] = useState(null);

  const groupedTransfers = React.useMemo(() => {
    const sortedTransfers = transactions
      .filter((trans) => trans.type === 'Transfer')
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedTransfers.reduce((acc, transaction) => {
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
    setSelectedTransferId(null);
  };

  const selectedTransfer = transactions.find(
    (exp) => exp.id === selectedTransferId
  );

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={onCancel}>
      <div>
        {groupedTransfers.length != 0 ? (
          Object.entries(groupedTransfers).map(([date, transactions]) => (
            <div key={date} className="mb-4">
              <h2 className="font-bold mb-1">{date}</h2>
              <div className="flex flex-col gap-2">
                {transactions.map((transfer) => (
                  <TransferCard
                    key={transfer.id}
                    transfer={transfer}
                    onClick={() => setSelectedTransferId(transfer.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-lg text-center text-blue-500 my-5">
            There are no transfers for this period.
          </h2>
        )}
      </div>

      {/* {selectedTransactionId && (
        <TransactionInfoModal
          key={selectedTransaction.id}
          title="Transaction Info"
          isOpen={!!selectedTransactionId}
          onCancel={handleModalClose}
          transaction={selectedTransaction}
        />
      )} */}
    </Modal>
  );
}
