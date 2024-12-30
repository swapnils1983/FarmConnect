// SellerDashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Orders from '../components/Orders';
import AddProduct from '../components/AddProduct';
import SellerAnalytics from '../components/SellerAnalytics';
import { useSelector } from 'react-redux';
import SellerProducts from '../components/SellerProducts';

const SellerDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('orders');
  const sellerId = useSelector(state => state.auth.user.id);

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelectedPage} />

      <div className="flex-grow p-4 overflow-y-auto">
        {selectedPage === 'orders' && <Orders />}
        {selectedPage === 'addProduct' && <AddProduct />}
        {/* {selectedPage === 'analytics' && <SellerAnalytics sellerId={sellerId} />} */}
        {selectedPage === 'products' && <SellerProducts sellerId={sellerId} />}
      </div>
    </div>
  );
};

export default SellerDashboard;
