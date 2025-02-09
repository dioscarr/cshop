import React, { useState } from 'react';
import { useTransactions } from '../../contexts/TransactionContext';
import PaymentForm from './PaymentForm';

const PaymentSelectionModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  appointmentDetails,
  onPaymentComplete 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { createTransaction } = useTransactions();
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCashPayment = async () => {
    setProcessing(true);
    try {
      const transaction = await createTransaction({
        amount,
        paymentMethod: 'cash',
        status: 'completed',
        appointmentId: appointmentDetails.id,
        service: appointmentDetails.service,
        barber: appointmentDetails.barber,
        datetime: appointmentDetails.datetime,
        customer: appointmentDetails.clientName
      });

      onPaymentComplete(transaction);
    } catch (error) {
      console.error('Cash payment recording failed:', error);
    } finally {
      setProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>
        
        <div className="mb-6">
          <div className="space-y-4">
            <div 
              className={`p-4 border rounded cursor-pointer ${
                paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-2"
                />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Pay now with your card</p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 border rounded cursor-pointer ${
                paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setPaymentMethod('cash')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  className="mr-2"
                />
                <div>
                  <p className="font-medium">Cash Payment</p>
                  <p className="text-sm text-gray-500">Pay at the store</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {paymentMethod === 'card' ? (
          <PaymentForm
            amount={amount}
            onSuccess={(transaction) => {
              onPaymentComplete(transaction);
              onClose();
            }}
            onError={(error) => {
              console.error('Payment failed:', error);
              // Handle error (show message, etc.)
            }}
            appointmentDetails={appointmentDetails}
          />
        ) : (
          <button
            onClick={handleCashPayment}
            disabled={processing}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {processing ? 'Processing...' : 'Confirm Cash Payment'}
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentSelectionModal;
