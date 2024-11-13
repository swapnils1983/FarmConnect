// Sidebar.js
import React, { useState } from 'react';
import { FiShoppingCart, FiPlusSquare, FiBarChart, FiLogOut, FiMenu } from 'react-icons/fi';

const Sidebar = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Orders', icon: <FiShoppingCart />, onClick: () => onSelect('orders') },
    { label: 'Add Product', icon: <FiPlusSquare />, onClick: () => onSelect('addProduct') },
    { label: 'Analytics', icon: <FiBarChart />, onClick: () => onSelect('analytics') },
    { label: 'Products', icon: <FiLogOut />, onClick: () => onSelect('products') },
  ];

  return (
    <div className="relative z-20">
      {/* Mobile Menu Button */}
      <button className="md:hidden p-4 text-gray-900" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu className="text-2xl" />
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:flex md:flex-col z-20`}
      >
        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold p-6 border-b border-gray-700 text-center">Dashboard</h2>

        {/* Sidebar Navigation */}
        <nav className="flex-grow">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                setIsOpen(false); // Close menu on mobile after selecting an option
              }}
              className="flex items-center p-4 hover:bg-gray-700 transition duration-200 w-full"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="text-lg">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Background overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
