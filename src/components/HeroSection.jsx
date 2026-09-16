import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen text-white px-4 sm:px-8 py-12 flex items-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mt-16 md:mt-0">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-white text-lg mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gray-300 shrink-0" />
            <span>Premium Shopping Experience</span>
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Shop the future, delivered today
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto md:mx-0 mb-8">
            Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              to="/products"
              className="w-full sm:w-auto cursor-pointer bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-3.5 rounded-lg transition duration-300 text-center shadow-md"
            >
              Shop Now
            </Link>

            <Link
              to="/categories"
              className="w-full sm:w-auto cursor-pointer border border-white/40 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg transition duration-300 text-center"
            >
              View Categories
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;