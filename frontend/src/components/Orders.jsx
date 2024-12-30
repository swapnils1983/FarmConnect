import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Orders() {
    const [orders, setOrders] = useState([]); // Initialize orders as an empty array
  const [statusUpdate, setStatusUpdate] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null); // Error state for API issues

  // Fetch orders for the seller
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders'); // Adjust endpoint as needed
        // Ensure the fetched data is an array
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders');
      }
    };
    fetchOrders();
  }, []);
  
  // Update order status
  const handleStatusChange = async (orderId) => {
    try {
      await axios.put(`http://localhost:3000/api/orders/${orderId}/status`, { status: statusUpdate });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: statusUpdate } : order
        )
      );
      setStatusUpdate("");
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      // Make a DELETE request to the delete order endpoint
      await axios.delete(`http://localhost:3000/api/products/delete/${orderId}`);
      // Update the orders state by removing the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      setError('Error deleting order');
    }
  };
  // Display error message if any error occurs
  if (error) {
    return <div className="p-6 bg-red-100 text-red-800">{error}</div>;
  }
  return (
    
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-100 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Seller Dashboard</h1>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Orders</h2>
          
          <table className="min-w-full border text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Product Name</th>
                <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Buyer Name</th>
                <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Quantity</th>
                <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Total Price</th>
                <th className="py-3 px-4 border-b text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border-b text-gray-800">{order.productId?.name || 'Unknown'}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{order.userId?.name || 'Unknown'}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{order.orderQty}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{order.status}</td>
                  <td className="py-3 px-4 border-b text-gray-800">${order.totalPrice}</td>
                  <td className="py-3 px-4 border-b">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded-md mr-2 text-sm hover:bg-blue-600"
                      onClick={() => setSelectedOrder(order._id)}
                    >
                      Update Status
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded-md text-sm hover:bg-red-600"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Update Status Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg m-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Update Order Status</h3>
              <select
                value={statusUpdate}
                onChange={(e) => setStatusUpdate(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                  onClick={() => handleStatusChange(selectedOrder)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setSelectedOrder(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  )
}

export default Orders