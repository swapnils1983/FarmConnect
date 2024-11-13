import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {
  const { product } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productParam = product === "getall" ? "" : product;
    fetch(`http://localhost:3000/api/products/getall/${productParam}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [product]);

  return (
<section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">
            {product === "getall" ? "All Products" : product}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="featured-product cursor-pointer" onClick={() => { navigate(`${product?._id}`); }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">by {product.brand}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-800 text-xl font-bold">₹{product.pricePerUnit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Products;
