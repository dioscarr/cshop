import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatabase } from '../contexts/DatabaseContext';
import { useAuth } from '../contexts/AuthContext';
import PaymentSelectionModal from './checkout/PaymentSelectionModal';

const ConfirmationPage = ({ 
  selectedBarber, 
  selectedService, 
  selectedDateTime, 
  resetSelection 
}) => {
  const navigate = useNavigate();
  const { createBooking, createAppointment } = useDatabase();
  const { user, signIn } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const bookingData = {
      client_name: clientInfo.name,
      client_email: clientInfo.email,
      client_phone: clientInfo.phone,
      barber_id: selectedBarber.id,
      service_id: selectedService.id,
      booking_datetime: selectedDateTime,
      status: 'pending',
      notes: `${selectedService.name} with ${selectedBarber.name}`
    };

    // Add this debug log
    console.log('Debug booking data:', {
      bookingData,
      selectedBarber,
      selectedService,
      selectedDateTime: new Date(selectedDateTime).toISOString()
    });

    try {
      const booking = await createBooking(bookingData);
      console.log('Created booking:', booking);
      
      // Navigate to success page
      navigate('/booking-success', { 
        state: { 
          booking,
          service: selectedService,
          barber: selectedBarber
        } 
      });
    } catch (err) {
      console.error('❌ Error creating booking:', err);
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(loginForm.email, loginForm.password);
      setShowLogin(false);
      handleConfirm(e);
    } catch (error) {
      setError('Login failed: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {showLogin ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Login Required</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="text-red-600">{error}</div>}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Login & Continue
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Confirm Your Appointment</h2>

          {/* Appointment Summary */}
          <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Appointment Details</h3>
            <div className="space-y-2">
              <p>Service: <span className="font-medium">{selectedService.name}</span></p>
              <p>Barber: <span className="font-medium">{selectedBarber.name}</span></p>
              <p>Date & Time: <span className="font-medium">
                {new Date(selectedDateTime).toLocaleString()}
              </span></p>
              <p>Duration: <span className="font-medium">{selectedService.duration} minutes</span></p>
              <p>Price: <span className="font-medium">${selectedService.price}</span></p>
            </div>
          </div>

          {/* Client Information Form */}
          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                value={clientInfo.name}
                onChange={(e) => setClientInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={clientInfo.email}
                onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                required
                value={clientInfo.phone}
                onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border rounded"
              />
            </div>

            {error && (
              <div className="text-red-600 p-2 rounded bg-red-50">
                {error}
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={resetSelection}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Start Over
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Creating Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};