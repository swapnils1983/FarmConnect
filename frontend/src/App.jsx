import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import SellerRegister from './components/SellerRegister';
import SellerLogin from './components/SellerLogin';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './components/Cart';
// import SellerDashboard from './components/SellerDashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import Index from './pages/Home';
import SellerDashboard from './pages/SellerDashboard';
import OrderStatus from './components/OrderStatus';


function App() {

  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:product" element={<Products />} />
          <Route path="/category/:product/:id" element={<ProductDetails />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
            <OrderStatus />

          </ProtectedRoute>
        }
      />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
