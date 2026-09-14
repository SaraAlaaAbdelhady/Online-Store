import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext.jsx";
import { OrderProvider } from "./contexts/OrderContext.jsx";
import { UserProvider } from "./contexts/UserContext";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import FeaturedProducts from "./components/FeaturedProducts.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <OrderProvider>
            <WishlistProvider>
              <CartProvider>
                <FeaturedProducts />
              </CartProvider>
            </WishlistProvider>
          </OrderProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;