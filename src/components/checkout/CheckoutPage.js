import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import { TransactionProvider } from '../../contexts/TransactionContext';

const CheckoutPageContent = ({ selectedService, selectedBarber, selectedDateTime }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const calculateTotal = () => {
    const servicePrice = selectedService?.price || 0;
    const tax = servicePrice * 0.08; // 8% tax
    const total = servicePrice + tax;
    return { servicePrice, tax, total };
  };

  const { servicePrice, tax, total } = calculateTotal();

  const handlePaymentSuccess = (transaction) => {
    // Navigate to success page with transaction details
    navigate('/checkout/success', { 
      state: { 
        transaction,
        appointment: {
          service: selectedService,
          barber: selectedBarber,
          dateTime: selectedDateTime
        }
      }
    });
  };

  const handlePaymentError = (error) => {
    setError('Payment failed. Please try again.');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Checkout</h2>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Order Summary */}
        <div className="mb-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{selectedService?.name}</span>
              <span>${servicePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <h3 className="font-medium mb-4">Payment Method</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Pay at Store</span>
            </label>
          </div>
        </div>

        {/* Payment Form */}
        {paymentMethod === 'card' ? (
          <PaymentForm 
            amount={total}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        ) : (
          <button
            onClick={() => handlePaymentSuccess({ status: 'pending', paymentMethod: 'cash' })}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm Cash Payment
          </button>
        )}
      </div>
    </div>
  );
};

// Wrapper component that provides the TransactionContext
const CheckoutPage = (props) => {
  return (
    <TransactionProvider>
      <CheckoutPageContent {...props} />
    </TransactionProvider>
  );
};

export default CheckoutPage;
