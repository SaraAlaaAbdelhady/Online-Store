import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { UserProvider } from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import Navbar from "./components/navbar.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/home/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import CartPage from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Profile from "./pages/Profile.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import "./index.css";
import UserLogin from "./auth/UserLogin.jsx";
import ForgetPassword from "./auth/ForgetPassword.jsx";
import VerifyOTP from "./auth/VerifyOTP.jsx";
import Register from "./components/Register.jsx";

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
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/verify-otp" element={<VerifyOTP />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgetPassword />}
                    />
                    <Route
                      path="/products"
                      element={
                        <div className="p-10 text-white text-2xl font-bold">
                          products
                        </div>
                      }
                    />
                    <Route path="/categories" element={<categories />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/Checkout" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<MyOrders />} />
                    <Route path="/orders/:id" element={<OrderDetails />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<FeaturedProducts />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                     <Route path="/register" element={<Register />} />
                  <Route path="/verify-otp" element={<VerifyOTP />} />
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
