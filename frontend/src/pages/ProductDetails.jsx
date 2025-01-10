import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const role = useSelector(state => state.auth?.user?.role);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
const {items} = useSelector(state => state.cart);

  const handleAddToCart = () => {
    if(role === undefined ){
      return alert("Please login to buy products")
    }
    if( role === "seller"){
      return alert("Please login as a buyer to buy products")
    }
    if (product) {
      dispatch(
        addItem({
          id: product._id,
          name: product.name,
          price: product.pricePerUnit,
          measuringUnit: product.measuringUnit,
          image: product.image,
          sellerId: product.sellerId,
        })
      );
    }
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/get/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Measuring Unit:</span> {product.measuringUnit}
          </p>
          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Description:</span> {product.description}
          </p>

          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-gray-900">
              ${product.pricePerUnit}
            </span>
            <span className="ml-2 text-gray-600">per {product.measuringUnit}</span>
          </div>

          <p className="text-gray-600 mb-6">
            <span className="font-semibold">Available Quantity:</span> {product.quantity}
          </p>

          <button onClick={handleAddToCart} className="w-full md:w-auto bg-green-800 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Seller Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">Seller Information</h2>
        <p className="text-gray-600">Seller Name: {product.sellerId?.name || "N/A"}</p>
      </div>

      {/* Date Added */}
      <p className="mt-4 text-gray-500 text-sm">
        Date Added: {new Date(product.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProductDetails;
