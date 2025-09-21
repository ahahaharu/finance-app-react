import { Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import { useExpenses } from '../../../context/ExpensesContext';
import TransactionCard from '../Transaction/TransactionCard';
import TransactionInfoModal from './TransactionInfoModal';

export default function CategoryHistoryModal({
  title,
  isOpen,
  onCancel,
  categoryId,
}) {
  const { expenses } = useExpenses();
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const groupedExpensesByCategory = useMemo(() => {
    const expensesByCategory = expenses.filter(
      (expense) => expense.category === categoryId
    );

    const sortedExpenses = [...expensesByCategory].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return sortedExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    }, {});
  }, [expenses]);

  const selectedTransaction = expenses.find(
    (exp) => exp.id === selectedTransactionId
  );

  return (
    <Modal title={title} open={isOpen} onCancel={onCancel} onOk={onCancel}>
      <div>
        {groupedExpensesByCategory ? (
          Object.entries(groupedExpensesByCategory).map(
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
