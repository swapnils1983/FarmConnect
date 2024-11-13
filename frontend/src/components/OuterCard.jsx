import React from 'react'

function OuterCard({product}) {
  return (
    
    <div className="container mx-auto px-6">
    {/* <h2 className="text-4xl font-bold text-center mb-12 text-green-800">
      Featured Products
    </h2> */}
    <div className="grid md:grid-cols-3 gap-8">
        <div  className="featured-product">
          <img 
            src={product?.image || 'https://via.placeholder.com/150'} 
            alt={product?.name || 'Product Image'}
            className="w-full h-48 object-cover"
          />
          <div className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-2">{product?.name || 'Unknown Product'}</h3>
            <p className="text-gray-600 mb-2">by {product?.sellerId?.name || 'Unknown Seller'}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-800 text-xl font-bold">{product?.pricePerUnit || '0.00'}</span>
              <button className="px-4 py-2 border border-green-800 rounded-lg hover:bg-green-800 hover:text-white transition-colors duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default OuterCard