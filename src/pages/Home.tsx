import React from 'react';

const Home = () => {
  return (
    <main className="relative min-h-screen w-full">
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/images/vintage-frame-salon-tools-wooden-table-jobs-career-concept.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="relative z-10 min-h-screen bg-black bg-opacity-60 flex flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to BookCut</h1>
        <p className="text-xl mb-8">Professional Barbershop Services</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
          Book Now
        </button>
      </div>
    </main>
  );
};

export default Home;
