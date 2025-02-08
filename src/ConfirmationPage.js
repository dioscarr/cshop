import React, { useState } from 'react';

function ConfirmationPage({ selectedBarber, selectedService, selectedDateTime, resetSelection, setCurrentStep }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Add a timer to reset after showing the confirmation
    setTimeout(resetSelection, 3000);
  };

  const handleBack = () => {
    setCurrentStep(3);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    return new Date(dateTime).toLocaleString();
  };

  if (isConfirmed) {
    return (
      <div className="max-w-xl mx-auto bg-white p-5 rounded-lg shadow-sm">
        <div className="text-center py-8">
          <div className="mb-4 text-green-500">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">Thank you for your reservation.</p>
          <p className="text-sm text-gray-500">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirm Your Booking</h2>
      
      <div className="space-y-3">
        <div className="border-b pb-3">
          <h3 className="text-sm font-medium text-gray-600">Selected Service</h3>
          <p className="text-gray-800">{selectedService?.name} - ${selectedService?.price}</p>
          <p className="text-gray-500 text-xs">Duration: {selectedService?.duration} minutes</p>
        </div>

        <div className="border-b pb-3">
          <h3 className="text-sm font-medium text-gray-600">Selected Barber</h3>
          <p className="text-gray-800">{selectedBarber?.name}</p>
          <p className="text-gray-500 text-xs">{selectedBarber?.description}</p>
        </div>

        <div className="border-b pb-3">
          <h3 className="text-sm font-medium text-gray-600">Appointment Time</h3>
          <p className="text-gray-800">{formatDateTime(selectedDateTime)}</p>
        </div>

        <div className="pt-4 flex justify-end space-x-3">
          <button
            onClick={handleBack}
            className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all text-sm"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all text-sm"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;