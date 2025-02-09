import React from 'react';
import { TransactionProvider, useTransactions } from '../../contexts/TransactionContext';
import { generateReceipt } from '../../utils/receiptGenerator';

const PaymentHistoryContent = () => {
  const { transactions } = useTransactions();

  const getTotalRevenue = () => {
    return transactions.reduce((sum, t) => 
      t.status === 'completed' ? sum + t.amount : sum, 0
    );
  };

  const getPendingPayments = () => {
    return transactions.filter(t => t.status === 'pending').length;
  };

  const getCompletedPayments = () => {
    return transactions.filter(t => t.status === 'completed').length;
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment History</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-semibold">${getTotalRevenue().toFixed(2)}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500">Pending Payments</h3>
            <p className="text-2xl font-semibold">{getPendingPayments()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500">Completed Payments</h3>
            <p className="text-2xl font-semibold">{getCompletedPayments()}</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barber</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4">
                  {new Date(transaction.datetime || transaction.date).toLocaleString()}
                </td>
                <td className="px-6 py-4">{transaction.customer}</td>
                <td className="px-6 py-4">{transaction.service}</td>
                <td className="px-6 py-4">{transaction.barber}</td>
                <td className="px-6 py-4">${transaction.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">{transaction.paymentMethod}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => generateReceipt(transaction)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentHistory = () => {
  return (
    <TransactionProvider>
      <PaymentHistoryContent />
    </TransactionProvider>
  );
};

export default PaymentHistory;
