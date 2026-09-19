import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { UserProvider } from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/home/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import "./index.css";
import CartPage from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <WishlistProvider>
                <CartProvider>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<HeroSection />} />
                    <Route
                      path="/products"
                      element={
                        <div className="p-10 text-white text-2xl font-bold">
                          products
                        </div>
                      }
                    />
                    <Route
                      path="/categories"
                      element={
                        <div className="p-10 text-white text-2xl font-bold">
                          categories
                        </div>
                      }
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/Checkout" element={<Checkout />} />
                  </Routes>
                  <Footer />
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
