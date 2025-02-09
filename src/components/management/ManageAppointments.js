import React, { useState } from 'react';
import { useTransactions, TransactionProvider } from '../../contexts/TransactionContext';
import { generateReceipt } from '../../utils/receiptGenerator';
import PaymentSelectionModal from '../checkout/PaymentSelectionModal';
import { useAppointments } from '../../contexts/AppointmentContext';

const AppointmentsContent = () => {
  const { appointments, updateAppointmentStatus, updatePaymentStatus } = useAppointments();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCheckout = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = (transaction) => {
    updatePaymentStatus(selectedAppointment.id, transaction.id);
    updateAppointmentStatus(selectedAppointment.id, 'completed');
    generateReceipt(transaction);
    setShowPaymentModal(false);
    setSelectedAppointment(null);
  };

  const getStatusBadge = (status, paid) => {
    if (paid) return "bg-green-100 text-green-800";
    switch (status) {
      case 'completed': return "bg-green-100 text-green-800";
      case 'pending': return "bg-yellow-100 text-yellow-800";
      case 'cancelled': return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    updateAppointmentStatus(appointmentId, newStatus);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <div className="flex gap-4">
            <select className="border p-2 rounded">
              <option>All Appointments</option>
              <option>Today</option>
              <option>This Week</option>
              <option>Pending Payment</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              New Appointment
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-6 py-4">
                    {new Date(appointment.datetime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </td>
                  <td className="px-6 py-4">{appointment.clientName}</td>
                  <td className="px-6 py-4">{appointment.service}</td>
                  <td className="px-6 py-4">{appointment.barber}</td>
                  <td className="px-6 py-4">${appointment.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(appointment.status, appointment.paid)}`}>
                      {appointment.paid ? 'Paid' : appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {!appointment.paid && (
                        <button
                          onClick={() => handleCheckout(appointment)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Checkout
                        </button>
                      )}
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {appointment.paid && (
                        <button
                          onClick={() => generateReceipt({
                            ...appointment,
                            date: new Date(appointment.datetime)
                          })}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPaymentModal && (
        <PaymentSelectionModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={selectedAppointment?.price || 0}
          appointmentDetails={selectedAppointment}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </>
  );
};

const ManageAppointments = () => {
  return (
    <TransactionProvider>
      <AppointmentsContent />
    </TransactionProvider>
  );
};

export default ManageAppointments;
