import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { UserProvider } from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import HeroSection from './components/HeroSection.jsx';
import './index.css';

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
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/products" element={<div className="p-10 text-white text-2xl font-bold">صفحة المنتجات</div>} />
                    <Route path="/categories" element={<div className="p-10 text-white text-2xl font-bold">صفحة الأقسام</div>} />
                  </Routes>
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
