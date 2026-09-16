import ShopByCategory from "../components/category";
import HowItWorks from "../components/home/HowItWorks";
import StayUpdated from "../components/home/StayUpdated";
import FeaturedProducts from "../components/FeaturedProducts.jsx";

const Home = () => {
  return (
    <>
      <ShopByCategory />
      <FeaturedProducts />
      <HowItWorks />
      <StayUpdated />
    </>
  );
};

export default Home;
