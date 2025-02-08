import React from 'react';

const Reports = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="space-y-2">
            <p>Today's Revenue: <span className="font-medium">$450</span></p>
            <p>This Week: <span className="font-medium">$2,850</span></p>
            <p>This Month: <span className="font-medium">$12,450</span></p>
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Popular Services</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Classic Haircut</span>
              <span className="font-medium">45 bookings</span>
            </div>
            <div className="flex justify-between">
              <span>Beard Trim</span>
              <span className="font-medium">38 bookings</span>
            </div>
            <div className="flex justify-between">
              <span>Full Service</span>
              <span className="font-medium">32 bookings</span>
            </div>
          </div>
        </div>

        {/* Barber Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Barber Performance</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>James Wilson</span>
              <span className="font-medium">4.9 ⭐</span>
            </div>
            <div className="flex justify-between">
              <span>Michael Chen</span>
              <span className="font-medium">4.8 ⭐</span>
            </div>
            <div className="flex justify-between">
              <span>David Rodriguez</span>
              <span className="font-medium">4.9 ⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
