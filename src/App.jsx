import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { UserProvider } from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/home/Footer.jsx";
// import ShopByCategory from "./components/category.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <WishlistProvider>
                <CartProvider>
                  <Routes>
                  <Route path="/" element={<Home />} />
         <Route path="/" element={<FeaturedProducts />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
                <Footer/>
                </CartProvider>
              </WishlistProvider>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </BrowserRouter>
    </>

  );
};

export default App;