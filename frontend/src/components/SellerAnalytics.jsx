// src/components/SellerAnalytics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerAnalytics = ({ sellerId }) => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orders/analytics/${sellerId}`);
        setAnalytics(response.data);
      } catch (error) {
        console.error("Error fetching analytics data", error);
      }
    };

    fetchAnalytics();
  }, [sellerId]);

  if (!analytics) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Seller Analytics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-medium">Total Sales</h3>
          <p className="text-xl">${analytics.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-md">
          <h3 className="text-lg font-medium">Total Orders</h3>
          <p className="text-xl">{analytics.totalOrders}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Order Status Breakdown</h3>
        <ul className="space-y-2">
          {Object.entries(analytics.statusCounts).map(([status, count]) => (
            <li key={status} className="bg-gray-100 p-2 rounded-md">
              {status}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SellerAnalytics;
