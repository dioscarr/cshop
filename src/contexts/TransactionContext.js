import React, { createContext, useContext, useState } from 'react';

const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [errors, setErrors] = useState([]);

  const createTransaction = async (transactionData) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date(),
      status: 'pending',
      retryCount: 0,
      ...transactionData
    };
    
    try {
      // Simulate API call
      await processPayment(newTransaction);
      
      newTransaction.status = 'completed';
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } catch (error) {
      logError(error, newTransaction);
      newTransaction.status = 'failed';
      setTransactions(prev => [...prev, newTransaction]);
      throw error;
    }
  };

  const retryTransaction = async (transactionId) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction || transaction.retryCount >= 3) {
      throw new Error('Maximum retry attempts reached');
    }

    try {
      const updatedTransaction = {
        ...transaction,
        retryCount: transaction.retryCount + 1,
        status: 'pending'
      };

      await processPayment(updatedTransaction);
      
      updatedTransaction.status = 'completed';
      setTransactions(prev => 
        prev.map(t => t.id === transactionId ? updatedTransaction : t)
      );
      return updatedTransaction;
    } catch (error) {
      logError(error, transaction);
      throw error;
    }
  };

  const logError = (error, transaction) => {
    const errorLog = {
      id: Date.now(),
      date: new Date(),
      transactionId: transaction.id,
      error: error.message,
      details: error.stack
    };
    
    setErrors(prev => [...prev, errorLog]);
  };

  const processPayment = async (transaction) => {
    // Simulate payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve(transaction);
        } else {
          reject(new Error('Payment processing failed'));
        }
      }, 1500);
    });
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions,
      errors, 
      createTransaction,
      retryTransaction,
      logError
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
