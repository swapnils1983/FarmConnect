import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  
  const isLogin = useSelector((state) => state.auth.status);
  const role = useSelector((state) => state.auth.user?.role);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl text-green-800 font-bold text-primary">Home</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsMenuOpen(true)}
              onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-gray-100 text-green-800">
                <span>Products</span>
              </Button>
              {isProductsMenuOpen && (
                <div className="absolute top-full left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-20">
                  <Link to="/category/getall" className="block px-4 py-2 hover:bg-gray-100 font-semibold">All Products</Link>
                  <Link to="/category/Rice" className="block px-4 py-2 hover:bg-gray-100">Rice</Link>
                  <Link to="/category/Wheat" className="block px-4 py-2 hover:bg-gray-100">Wheat</Link>
                  <Link to="/category/Nuts" className="block px-4 py-2 hover:bg-gray-100">Nuts</Link>
                  <Link to="/category/Sugar" className="block px-4 py-2 hover:bg-gray-100">Sugar</Link>
                  <Link to="/category/spices" className="block px-4 py-2 hover:bg-gray-100">Spices</Link>
                  <Link to="/category/Fruits" className="block px-4 py-2 hover:bg-gray-100">Fruits</Link>
                  <Link to="/category/Vegetables" className="block px-4 py-2 hover:bg-gray-100">Vegetables</Link>
                  <Link to="/category/pulses" className="block px-4 py-2 hover:bg-gray-100">Pulses</Link>
                </div>
              )}
            </div>

            {/* Conditional Seller Dashboard */}
            {isLogin && role === "seller" && (
              <Link to="/seller/dashboard" className="text-green-800 font-semibold hover:bg-gray-100 px-4 py-2 rounded-md">
                Seller Dashboard
              </Link>
            )}

            {/* Conditional Login/Logout */}
            {isLogin ? (
              <Button onClick={handleLogout} variant="ghost" className="text-green-800 flex items-center space-x-2 hover:bg-gray-100">
                <span>Logout</span>
              </Button>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setIsLoginMenuOpen(true)}
                onMouseLeave={() => setIsLoginMenuOpen(false)}
              >
                <Button variant="ghost" className="text-green-800 flex items-center space-x-2 hover:bg-gray-100">
                  <span>Login</span>
                </Button>
                {isLoginMenuOpen && (
                  <div className="absolute top-full left-0 mt-0 w-36 bg-white border rounded-md shadow-lg z-20">
                    <Link to="user/login" className="block px-4 py-2 hover:bg-gray-100">Buyer Login</Link>
                    <Link to="seller/login" className="block px-4 py-2 hover:bg-gray-100">Farmer Login</Link>
                  </div>
                )}
              </div>
            )}

            {/* Cart Button */}
            <Button
              onClick={() => navigate('/cart')}
              variant="ghost"
              className="flex items-center space-x-2 hover:bg-gray-100 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="h-6 w-6 flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                <span className={`block w-full h-0.5 bg-gray-600 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-full h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isLogin && role === "seller" && (
            <Link to="/seller/dashboard" className="block px-4 py-2 hover:bg-gray-100">Seller Dashboard</Link>
          )}
          {isLogin ? (
            <Button onClick={handleLogout} variant="ghost" className="w-full flex items-center space-x-2 hover:bg-gray-100">
              <span>Logout</span>
            </Button>
          ) : (
            <>
              <Link to="user/login" className="block px-4 py-2 hover:bg-gray-100">Buyer Login</Link>
              <Link to="seller/login" className="block px-4 py-2 hover:bg-gray-100">Farmer Login</Link>
            </>
          )}
          <Button variant="ghost" className="w-full flex items-center space-x-2 hover:bg-gray-100 relative">
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
