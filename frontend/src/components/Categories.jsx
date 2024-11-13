import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {


  const navigate = useNavigate();

  const categories = [
    
      {
          "title": "Rice",
          "img": "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=1024x1024&w=is&k=20&c=x7EkgZuuESwrs4NuHxX5rEzAHP9uwPij9l5AnKUOYWg="
      },
      {
          "title": "Wheat",
          "img": "https://plus.unsplash.com/premium_photo-1661963447711-27f892ffe292?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
          "title": "Nuts",
          "img": "https://media.istockphoto.com/id/1192503671/photo/trail-mix-nuts.webp?s=2048x2048&w=is&k=20&c=0S7uus50C64Gc7x7mfV03X6GhpACxuOxXtkOeE_heBE="
      },
      {
          "title": "Sugar",
          "img": "https://media.istockphoto.com/id/1420446362/photo/white-granulated-sugar-and-refined-sugar-cubes-close-up-in-the-kitchen.webp?s=2048x2048&w=is&k=20&c=cndtSmUJjNb8O2KoGFsW-0jP51b2DWjQQeLA7Ra-2oQ="
      },
      {
          "title": "Spices",
          "img": "https://www.thespruceeats.com/thmb/3FJ3jGRrC8YPKb3ZAMep_opxP8o=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/spices-2500-56a20ee15f9b58b7d0c61d97.jpg"
      },
      {
          "title": "Fruits",
          "img": "https://storage.vivago.ai/image/p_b3e63b2c-9455-11ef-8efb-32736085ceaf.jpg?width=512"
      },
      {
          "title": "Vegetables",
          "img": "https://storage.vivago.ai/image/p_f90b04b2-9455-11ef-a74d-32736085ceaf.jpg?width=512"
      },
      {
          "title": "Pulses",
          "img": "https://media.istockphoto.com/id/1301675046/photo/variety-kinds-of-natural-cereal-and-grain-seed-in-sack-and-dark-tone-for-clean-food-raw.jpg?s=612x612&w=0&k=20&c=99rJqzUdDPHr0N7USGYrxnAN3RRXaXQrkJbxcM4v8-w="
      }
  
  
    
  ];

  const handleOnClick = (category) => {
    navigate(`/category/${category}`);
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Categories</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our wide range of services
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div onClick={()=>handleOnClick(category.title)} key={index} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="relative overflow-hidden h-48">
                <img 
                  src={category.img} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;