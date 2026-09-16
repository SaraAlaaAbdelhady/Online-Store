import ShopByCategory from "../components/category";
import HowItWorks from "../components/home/HowItWorks";
import StayUpdated from "../components/home/StayUpdated";
import FeaturedProducts from "../components/FeaturedProducts.jsx";
import HeroSection from "../components/HeroSection.jsx";

const Home = () => {
  return (
    <>
    <HeroSection/>
    
      <ShopByCategory />
      <FeaturedProducts />
      <HowItWorks />
      <StayUpdated />
    </>
  );
};

export default Home;
