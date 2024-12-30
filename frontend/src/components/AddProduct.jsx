import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

const AddProduct = () => {
  const user = useSelector((state) => state.auth.user);
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    pricePerUnit: '',
    measuringUnit: '',
    quantity: '',
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('brand', user.brandName);
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    try {
      const token = user.token;
      await axios.post('http://localhost:3000/api/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product added successfully');
      setProductData({
        name: '',
        category: '',
        description: '',
        pricePerUnit: '',
        measuringUnit: '',
        quantity: '',
      });
      setFile(null);
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(user)
  return (
    <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-8 transform transition duration-300 hover:scale-105"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800">Add New Product</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="image">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['name', 'category', 'description', 'pricePerUnit', 'measuringUnit', 'quantity'].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 capitalize" htmlFor={field}>
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'pricePerUnit' || field === 'quantity' ? 'number' : 'text'}
                id={field}
                name={field}
                value={productData[field]}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg`}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
