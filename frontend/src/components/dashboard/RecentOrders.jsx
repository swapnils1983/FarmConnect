const orders = [
    { id: "ORD001", customer: "John Doe", product: "Gaming Laptop", total: "$1,299.99", status: "Processing" },
    { id: "ORD002", customer: "Jane Smith", product: "Wireless Headphones", total: "$199.99", status: "Shipped" },
    { id: "ORD003", customer: "Bob Johnson", product: "Smartphone", total: "$899.99", status: "Delivered" },
  ];
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const RecentOrders = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`px-2 py-1 text-sm rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RecentOrders;
  