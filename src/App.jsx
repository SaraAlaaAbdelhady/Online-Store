import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { UserProvider } from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";
import Wishlist from "./components/Wishlist.jsx";
import Register from "./components/Register.jsx";
import VerifyOtp from "./components/VerifyOtp.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <OrderProvider>
            <WishlistProvider>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<FeaturedProducts />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verify-otp" element={<VerifyOtp />} />
                </Routes>
              </CartProvider>
            </WishlistProvider>
          </OrderProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;