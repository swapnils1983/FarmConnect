import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../redux/cartSlice";
import axios from "axios";


const Cart = () => {
  const [isUpdating, setIsUpdating] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();

  // console.log(userId)
  console.log(items)

  const placeOrder = async () => {
    try {
      const orderData = items.map((item) => ({
        productId: item.id,
        userId,
        orderQty: item.quantity,
        sellerId: item.sellerId._id, // Ensure sellerId is part of your item object
        totalPrice: item.price * item.quantity,
      }));
      
      await Promise.all(
        orderData.map(async (order) => {
          await axios.post('http://localhost:3000/api/orders/create', order);
        })
      );

      alert('Order placed successfully!');
      dispatch(clearCart());
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
 
  console.log(items)
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Shopping Cart</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-6 flex flex-col sm:flex-row items-center gap-4 transition-opacity duration-200 ${
              isUpdating === item.id ? "opacity-50" : "opacity-100"
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-600">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {dispatch(removeItem({ id: item.id, price: item.price }))}}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isUpdating === item.id}
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <button
                onClick={() => {dispatch(addItem({ id: item.id, price: item.price }))}}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                disabled={isUpdating === item.id}
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-lg font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              
              <button
                onClick={() => {dispatch(clearCart({ id: item.id }))}}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Your cart is empty
        </div>
      ) : (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">Subtotal</span>
            <span className="text-2xl font-semibold text-gray-900">
              ${subtotal?.toFixed(2)}
            </span>
          </div>
          <button onClick={placeOrder}
           className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Place Order
          </button>
          <button
            onClick={() => dispatch(clearCart())}
            className="mt-2 w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
