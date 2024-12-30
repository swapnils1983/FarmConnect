import React, { useState } from 'react';
import { Leaf, Truck, Users, ShoppingBasket, ChevronRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const featuredProducts = [
    {
      id: 1,
      name: "Fresh Organic Vegetables",
      price: "$24.99",
      image: "https://media.istockphoto.com/id/854725372/photo/healthy-food-clean-eating-selection.jpg?s=612x612&w=0&k=20&c=Ef1hlrgJnDdZvs05v6yKz1ajYZX_KaWJdR9vIVSxXP0=",
      farmer: "Green Valley Farm"
    },
    {
      id: 2,
      name: "Farm Fresh Eggs",
      price: "$5.99",
      image: "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      farmer: "Happy Hens Farm"
    },
    {
      id: 3,
      name: "Organic Honey",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      farmer: "Busy Bees Apiary"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
            Fresh From Farm to Your Table
          </h1>
          <p className="text-xl mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            Connect directly with local farmers for the freshest produce
          </p>
          <button 
            className="bg-white text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300 animate-fadeIn flex items-center justify-center mx-auto"
            style={{ animationDelay: "0.4s" }}
            onClick={()=>{
              navigate('/category/getall')
            }}
          >
            Shop Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">
            Featured Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="featured-product">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">by {product.farmer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="h-8 w-8 text-green-800" />,
                title: "Fresh & Organic",
                description: "100% organic products directly from local farms"
              },
              {
                icon: <Users className="h-8 w-8 text-green-800" />,
                title: "Support Local",
                description: "Help local farmers thrive in your community"
              },
              {
                icon: <Truck className="h-8 w-8 text-green-800" />,
                title: "Fast Delivery",
                description: "Quick farm-to-door delivery service"
              },
              {
                icon: <ShoppingBasket className="h-8 w-8 text-green-800" />,
                title: "Best Prices",
                description: "Competitive prices for quality produce"
              }
            ].map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <footer className="bg-gray-800 text-white py-6">
  <div className="container mx-auto px-6 text-center">
    <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    <div className="flex justify-center gap-4 mt-4">
      <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
      <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Index;
