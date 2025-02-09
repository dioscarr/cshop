import React, { useState } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';

const PaymentForm = ({ amount, onSuccess, onError }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const { createTransaction, updateTransactionStatus } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Create initial transaction record
      const transaction = createTransaction({
        amount,
        paymentMethod: 'card',
        cardLast4: cardNumber.slice(-4),
      });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update transaction status
      updateTransactionStatus(transaction.id, 'completed');
      onSuccess(transaction);
    } catch (error) {
      onError(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Card Number</label>
        <input
          type="text"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="text"
            maxLength="5"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="text"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
            className="w-full p-2 border rounded"
            placeholder="123"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
