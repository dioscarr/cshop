export const generateReceipt = (transaction) => {
  // Ensure we have the required values or set defaults
  const amount = transaction.amount || transaction.price || 0;
  const serviceName = transaction.service || 'Service';
  const tax = amount * 0.08;
  const total = amount + tax;

  const receipt = {
    id: transaction.id || Date.now(),
    date: new Date(transaction.date || transaction.datetime || Date.now()).toLocaleString(),
    items: [{
      name: serviceName,
      price: amount
    }],
    subtotal: amount,
    tax: tax,
    total: total,
    paymentMethod: transaction.paymentMethod || 'cash',
    barber: transaction.barber || 'Not specified'
  };

  // Generate PDF-like structure
  const receiptHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .container { padding: 20px; max-width: 400px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 20px; }
        .detail { display: flex; justify-content: space-between; margin: 5px 0; }
        .divider { border-top: 1px solid #ccc; margin: 10px 0; }
        .total { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>BookCut Receipt</h2>
          <p>Transaction ID: ${receipt.id}</p>
          <p>Date: ${receipt.date}</p>
          <p>Barber: ${receipt.barber}</p>
        </div>
        <div class="divider"></div>
        ${receipt.items.map(item => `
          <div class="detail">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
          </div>
        `).join('')}
        <div class="divider"></div>
        <div class="detail">
          <span>Subtotal</span>
          <span>$${receipt.subtotal.toFixed(2)}</span>
        </div>
        <div class="detail">
          <span>Tax (8%)</span>
          <span>$${receipt.tax.toFixed(2)}</span>
        </div>
        <div class="detail total">
          <span>Total</span>
          <span>$${receipt.total.toFixed(2)}</span>
        </div>
        <div class="divider"></div>
        <p>Payment Method: ${receipt.paymentMethod}</p>
      </div>
    </body>
    </html>
  `;

  // Create a new window and print
  const receiptWindow = window.open('', '_blank');
  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
  receiptWindow.print();
};
