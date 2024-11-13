// src/components/SellerProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerProducts = ({ sellerId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/orders/products/seller/${sellerId}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);
  console.log(products)
  const handleEdit = (productId) => {
    // Implement edit logic or navigation here
    console.log("Edit product with ID:", productId);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      console.log("Deleted product with ID:", productId);
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-medium text-left">Image</th>
              <th className="px-4 py-2 border-b font-medium text-left">Name</th>
              <th className="px-4 py-2 border-b font-medium text-left">Price</th>
              <th className="px-4 py-2 border-b font-medium text-left">Quantity</th>
              <th className="px-4 py-2 border-b font-medium text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                </td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.pricePerUnit}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-700 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-3 py-1 text-white bg-red-500 hover:bg-red-700 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProducts;
