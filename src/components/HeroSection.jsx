import { GiSparkles } from 'react-icons/gi';
import { Link } from 'react-router-dom';
// import { Sparkles } from 'lucide-react';
const HeroSection = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-slate-950 dark:via-gray-900 dark:to-slate-900 min-h-screen text-white px-4 sm:px-8 py-12 flex items-center shadow-sm transition-colors duration-500">      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mt-16 md:mt-0">
        

        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-white text-lg mb-6 flex items-center gap-2">
            <GiSparkles className="w-5 h-5 text-gray-300 shrink-0" />
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
              to="/shop"
              className="w-full sm:w-auto cursor-pointer bg-white dark:bg-blue-600 text-blue-700 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-500 font-semibold px-8 py-3.5 rounded-lg transition duration-300 text-center shadow-md"
            >
              Shop Now
            </Link>

            <Link
              to="/categories"
              className="w-full sm:w-auto cursor-pointer border border-white/40 dark:border-gray-600 hover:bg-white/20 dark:hover:bg-gray-800/50 text-white font-semibold px-8 py-3.5 rounded-lg transition duration-300 text-center"
            >
              View Categories
            </Link>
          </div>

        </div>
      </div>
        <style>{`
  @keyframes speed-line {
    0% { transform: translateX(-40px); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateX(220px); opacity: 0; }
  }
  .speed-line {
    animation: speed-line 2.2s linear infinite;
  }
  @keyframes wheel-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .wheel-spin {
    animation: wheel-spin 4s linear infinite;
  }
`}</style>
        <div className="absolute top-[20%] left-0 speed-line" style={{ animationDelay: "0s" }}>
          <div className="w-50 h-[3px] rounded-full bg-white/70" />
        </div>
        <div className="absolute top-[40%] left-0 speed-line" style={{ animationDelay: "0.6s" }}>
          <div className="w-50 h-[3px] rounded-full bg-white/40" />
        </div>
        <div className="absolute top-[65%] left-0 speed-line" style={{ animationDelay: "1.2s" }}>
          <div className="w-20 h-[3px] rounded-full bg-white/55" />
        </div>

        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-4 border-white/20 wheel-spin flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white/30" />
        </div>
      </section>


    </>
  );
};

export default HeroSection;