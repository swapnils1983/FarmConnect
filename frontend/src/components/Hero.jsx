const Hero = () => {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://pciaw.org/wp-content/uploads/2022/11/eric-welch-XucH5JNRFig-unsplash-scaled-e1668515279954.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
            Welcome to <span className="text-blue-400">YourBrand</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-up animation-delay-200">
            Create stunning websites with our modern and responsive design solutions. Start your journey today.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300 animate-fade-up animation-delay-300">
            Get Started
          </button>
        </div>
      </div>
    );
  };
  
  export default Hero;