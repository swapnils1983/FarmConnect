import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const OrderStatus = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.user.token); // Get token from Redux store

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/orders/buyer/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, token]); // Include token in dependency array to refetch if it changes

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-md bg-white p-4 transition-transform transform hover:scale-105"
            >
              {order.productId?.image ? (
                <img
                  src={order.productId.image}
                  alt={order.productId.name}
                  className="w-full h-48 object-cover rounded-t-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 mb-4 rounded-t-md">
                  No Image Available
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-600">
                <strong>Product:</strong> {order.productId?.name || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Quantity:</strong> {order.orderQty}
              </p>
              <p className="text-gray-600">
                <strong>Total Price:</strong> ₹{order.totalPrice}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Shipped"
                      ? "text-blue-500"
                      : order.status === "Delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-semibold`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-gray-600">
                <strong>Order Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
